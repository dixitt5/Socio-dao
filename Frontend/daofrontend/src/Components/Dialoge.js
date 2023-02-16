import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useState } from "react";
import { utils } from "ethers";

export function Dialoge(props) {
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Value (In ether)"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code (1 = maintenance, 2 = transfer)"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            Current Service Guy : {props.guy}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Submit</Button>
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
