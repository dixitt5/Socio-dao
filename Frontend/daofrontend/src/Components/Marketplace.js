import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const Marketplace = () => {
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
      <div>
        <Paper elevation={24} sx={{ margin: "5px", padding: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">House no.</Typography>
            <Typography variant="h5">Owner</Typography>
            <Typography variant="subititle">price in matic</Typography>
            <ButtonGroup>
              <Button variant="outlined">Buy</Button>
              <Button variant="outlined">Details</Button>
            </ButtonGroup>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Marketplace;
