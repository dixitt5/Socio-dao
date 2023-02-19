import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { providers } from "ethers";
import Contract from "../utils/contract";
import { getGlobalState, setGlobalState, useGlobalState } from "../store";

function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress] = useGlobalState("walletAddress");

  // const web3ModalRef = useRef();
  const connectwallet = async () => {
    try {
      await Contract.connectWallet();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addr = walletAddress.slice(0, 20) + "...";

  // const wallettAddress = async () => {
  //   try {
  //     const address = await signer.getAddress();
  //     return address;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const getPorS = { getProviderOrSigner };

  useEffect(() => {
    // if (!walletConnected) {
    //   web3ModalRef.current = new Web3Modal({
    //     network: "mumbai",
    //     providerOptions: {},
    //     disableInjectedProvider: false,
    //   });

    connectwallet().then(() => {
      // Contract.getDAOTreasuryBalance();
      // Contract.getUserNFTBalance();
      Contract.getNumProposalsInDAO();
    });
    // }
  }, [walletConnected]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#FFD914" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MapsHomeWorkIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Socio-DAO
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <Typography variant="subtitle2">{addr}</Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <FormGroup sx={{ m: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
                onClick={connectwallet}
              />
            }
            label={auth ? "Disconnect wallet" : "Connect wallet"}
          />
        </FormGroup>
        <div className="Banner">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid xs={6}>
              <Typography variant="h3" className="typo">
                The Society DAOs..
              </Typography>
              <Typography variant="subtitle1" className="newtext">
                A DAO for housing societies, create value-adding proposals and
                vote on them in decentralized manner.
              </Typography>

              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                className="new-btn"
              >
                <Link to="/market">
                  <Button>Available Properties</Button>
                </Link>
                <Link to="/voting">
                  <Button>Get started</Button>
                </Link>
              </ButtonGroup>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://d33wubrfki0l68.cloudfront.net/eeb1c4eb81864cd215bdcbebb63679534af42773/e7824/static/d17b5ecb3655c50d6540e590a93d65e7/87c97/dao-2.png"
                className="img-1"
              />
            </Grid>
          </Grid>
        </div>
        ;
      </Box>
    </>
  );
}

export default MenuAppBar;
