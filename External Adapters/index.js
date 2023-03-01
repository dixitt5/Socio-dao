const { Requester, Validator } = require("@chainlink/external-adapter");
require("dotenv").config();

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = data => {
  if (data.Response === "Error") return true;
  return false;
};

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  aadhar: ["aadhar"],
  endpoint: false,
};

const issuer = "f38b1569-9752-4eb5-b12c-ad6171883de5"
const schema = "2fcd7e7d-5006-4fc9-994a-65d316974319"

const createRequest = async(input, callback) => {

  // const response = await axios.post("https://api-staging.polygonid.com/v1/orgs/account-management/refresh-token", {method: 'POST', headers: headers});
  // The Validator helps you validate the Chainlink request data);
  const validator = new Validator(input, customParams);

  const jobRunID = validator.validated.id;
  const aadhar = parseInt(validator.validated.data.aadhar)

  const url = `https://api-staging.polygonid.com/v1/issuers/${issuer}/schemas/${schema}/offers`;
  const body = {
    "attributes": [
      {
        attributeKey: "Aadhar Number",
        attributeValue: aadhar
      }
    ],
    "limitedClaims": 1
  }

  const config = {
    method: 'POST',
    url,
    params: {},
    headers: { 'Authorization': process.env.JWT_TOKEN },
    data: body
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then(response => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.
      response.data = {
        result: response.data,
        date: response.headers.date,
      };

      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch(error => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;