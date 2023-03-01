# External Adapter Data Structures

## Request Data

Requests to External Adapters conform to the following structure ([docs](https://docs.chain.link/docs/developers/#requesting-data)). Not all fields are required though.

You can check that your external adapter is responsive by sending it a manual `curl` request that simulates what it would receive from a Chainlink Node.

A sample curl request to the External Adapter for the Numbers API will look like:
`curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 10, "data": { "number":"random", "infoType": "trivia" } }'` for the API to choose a random number and return trivia on it

and

`curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 10, "data": { "number":19, "infoType": "math" } }'` for the API to provide some math fact about the number `19`.

When interacting with a Chainlink Node, the External Adapter will receive a post request that looks something like this:

```
{
  data: { infoType: 'trivia', number: '9' },
  id: '0x93fd920063d2462d8dce013a7fc75656',
  meta: {
    oracleRequest: {
     // .... some data ....
    }
  }
}

```

## Response Data

Our external adapter returns data in the following structure ([docs](https://docs.chain.link/docs/developers/#returning-data)). Not all fields are required though.

```
returned response:   {
  jobRunId: '0x93fd920063d2462d8dce013a7fc75656',
  statusCode: 200,
  data: {
    result: "9 is the number of circles of Hell in Dante's Divine Comedy."
  }
}
```
