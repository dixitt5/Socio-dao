import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { connectWallet } from "../Components/wallet";
// import { useAccount, useProvider } from "wagmi";
// import aapp from "../_app";

export default function ButtonAppBar() {
  // const account = useAccount();
  return (
    <Box sx={{ flexGrow: 1 }} className="appbox">
      <AppBar position="static" className="appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAO
          </Typography>
          <Button
            color="inherit"
            variant="contained"
            className="butn"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
          {/* <ConnectButton /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
