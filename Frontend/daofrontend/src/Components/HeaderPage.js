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
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";

function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    // console.log(provider);
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Please switch to mumbai network!");
      throw new Error("Please switch to mumbai network!");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      // connectWallet().then(() => {
      //   getDAOTreasuryBalance();
      //   getUserNFTBalance();
      //   getNumProposalsInDAO();
      // });
    }
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
                  <Typography variant="subtitle2">wallet Address</Typography>
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
                onClick={connectWallet}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate repellendus esse consequuntur incidunt ipsam omnis
                eius, beatae illum aliquid delectus cupiditate dolor amet
                architecto
              </Typography>

              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                className="new-btn"
              >
                <Button>Owner DashBoard</Button>
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
