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
import VoteAndEx from "../utils/voteAndExecution";
import { utils } from "ethers";

export function Dialog1(props) {
  const [proposalLabel, setProposalLabel] = useState("");
  const [proposalValue, setProposalValue] = useState(0);
  const [proposalCode, setProposalCode] = useState(0);

  const createProposal = async () => {
    try {
      // const etherValue = utils.parseEther(proposalValue.toString());
      const signer = await props.fun;
      console.log(signer);
      const daoContract = getDaoContractInstance(signer);
      const tx = await daoContract.createProposal(proposalLabel);
      // add text from the user
      // setLoading(true);
      await tx.wait();
      // await getNumProposalsInDAO();
      // setLoading(false);
      console.log(proposalLabel, proposalCode, proposalValue);
    } catch (error) {
      console.error(error);
      window.alert(error.data.message);
    }
  };

  return (
    <div className="dialog">
      <Dialog open={true}>
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
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={createProposal}>
            Submit
          </Button>
          <Button variant="outlined" onClick={props.setoff}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <VoteAndEx value={proposalValue} code={proposalCode} />
    </div>
  );
} /////changed

export default Dialog1;
{
  /* fun3 = {walletConnected} fun4 = {()=>{setWalletConnected(true)}} */
}
