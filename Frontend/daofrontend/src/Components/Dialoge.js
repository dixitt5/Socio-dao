import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { getDaoContractInstance } from "../utils/contractInstances";
import { useState } from "react";
import { utils } from "ethers";
import Proposals from "./Proposals";

export function Dialoge(props) {
  const [proposalLabel, setProposalLabel] = useState("");
  const [proposalValue, setProposalValue] = useState(0);
  const [proposalCode, setProposalCode] = useState(0);
  const idToCode = new Map();
  const idToValue = new Map();
  const idToLabel = new Map();
  var id = 0;

  const createProposal = async () => {
    try {
      // const etherValue = utils.parseEther(proposalValue.toString());
      // console.log("hello");
      const signer = await props.signer;
      // console.log(signer);
      // console.log("hii");
      const daoContract = getDaoContractInstance(signer);
      const tx = await daoContract.createProposal(proposalLabel);
      // add text from the user
      // setLoading(true);
      await tx.wait();
      // await props.numProp;
      // setLoading(false);
      idToCode.set(id, proposalCode);
      idToLabel.set(id, proposalLabel);
      idToValue.set(id, proposalValue);
      id++;
      console.log(proposalLabel, proposalCode, proposalValue, id);
    } catch (error) {
      console.error(error);
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
            onChange={(e) => setProposalLabel(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Value (In ether)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProposalValue(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code (1 = maintenance, 2 = transfer)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProposalCode(e.target.value)}
          />
          <DialogContentText>
            Current Service Guy : {props.guy}
          </DialogContentText>
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
      <Proposals
        value={proposalValue}
        code={proposalCode}
        idCode={idToCode}
        idLabel={idToLabel}
        idValue={idToValue}
      />
    </div>
  );
} /////changed
{
  /* fun3 = {walletConnected} fun4 = {()=>{setWalletConnected(true)}} */
}
export default Dialoge;
