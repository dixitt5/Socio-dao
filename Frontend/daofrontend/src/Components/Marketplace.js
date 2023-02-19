import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import QRCode from "qrcode.react";

const Marketplace = () => {
  const data = {
    id: "2fcd7e7d-5006-4fc9-994a-65d316974319",
    typ: "application/iden3comm-plain-json",
    type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    body: {
      transaction_data: {
        contract_address: "0x21CFc819CF8B60a4485C042Fa02Ea2B1FfF27402",
        method_id: "b68967e2",
        chain_id: 80001,
        network: "polygon-mumbai",
      },
      reason: "mint erc1155 token",
      scope: [
        {
          id: 1,
          circuit_id: "credentialAtomicQuerySig",
          rules: {
            query: {
              allowed_issuers: ["*"],
              req: {
                "Aadhar Number": {
                  $in: [99],
                },
              },
              schema: {
                url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/b95cab1e-c46c-4204-b393-28f09556bfd3.json-ld",
                type: "Aadhar",
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div className="main">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          to="/"
          className="bread"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>
        <Typography color="text.primary">Marketplace</Typography>
      </Breadcrumbs>
      <div className="setMargin">
        <Typography variant="h5" sx={{ fontWeight: "400", color: "black" }}>
          You want to Buy property in our society?
          <br />
          Verify your aadhar number to proceed for sale
        </Typography>
        <Button variant="contained">verify yourself</Button>
      </div>
      <div>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            textDecoration: "underline",
          }}
        >
          Properties for sale
        </Typography>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {/* {data.map((value, index) => {
            return <NFTTile data={value} key={index} />;
          })} */}
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://ipfs.io/ipfs/QmP4hLHgyDqWkcRGo1v9sCvLezSqiKufD9r9cTvLbYAyBr"
              title="2 BHK"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                2 BHK
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A luxorious 2 BHK home.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Buy</Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <QRCode value={JSON.stringify(data)} />
    </div>
  );
};

export default Marketplace;
