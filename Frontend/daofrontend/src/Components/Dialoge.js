import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { getDaoContractInstance } from "../utils/instances";
import { ethcontext } from "./HeaderPage";
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";

import { useState, useRef } from "react";
import { utils } from "ethers";

export function Dialoge(props) {
  const [label, setLabel] = useState("");
  const web3ModalRef = useRef();

  // const getproviderorsignertrue = () => {
  //   context.getProviderOrSigner(true);
  // };

  // const getproviderorsignerfalse = () => {
  //   context.getProviderOrSigner(false);
  // };

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

  const createProposal = async () => {
    try {
      const signer = getProviderOrSigner(true);
      const daoContract = getDaoContractInstance(signer);
      const tx = await daoContract.createProposal(label);
      // setLoading(true);
      await tx.wait();
      // await getNumProposalsInDAO();
      // setLoading(false);
    } catch (error) {
      console.error(error);
      window.alert(error.data.message);
    }
  };
  return (
    <div className="dialoge">
      <Dialog open={props.open}>
        {/*  true */}
        <DialogTitle>Add your proposal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add the label and details for your proposed plan.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter the label of your proposal"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setLabel(e.target.value)}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Value (In ether)"
            type="text"
            fullWidth
            variant="standard"
          /> */}

          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code (1 = maintenance, 2 = transfer)"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          {/* <DialogContentText>
            Current Service Guy : {props.guy}
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={createProposal}>
            Submit
          </Button>
          <Button variant="outlined" onClick={props.close}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} /////changed
{
  /* fun3 = {walletConnected} fun4 = {()=>{setWalletConnected(true)}} */
}
export default Dialoge;
