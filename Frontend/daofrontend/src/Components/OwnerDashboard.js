import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExecutionContractInstance } from "../utils/contractInstances";
import Dialoge from "./Dialog";

export function OwnerDashboard(props) {
  const history = useNavigate();
  const [serviceGuyName, setServiceGuyName] = useState("");
  const [serviceProvided, setServiceProvided] = useState("");

  const changeServiceGuy = async () => {
    try {
      const signer = await props.fun;
      const executionContract = ExecutionContractInstance(signer);
      const tx = await executionContract.setServiceGuy(serviceGuyName);
      await tx.wait();
      console.log(serviceProvided, serviceGuyName);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="OwnerDashboard">
      <Dialog open={false}>
        {/*  true */}
        <DialogTitle>Owner DashBoard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set the address of a service guy that will manage the task.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter the Address of the Service-guy (i.e. 0x.. )"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setServiceGuyName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="details of the service"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setServiceProvided(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              history("/");
            }}
            // onClick={props.close}
          >
            Close
          </Button>
          <Button variant="outlined" onClick={changeServiceGuy}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialoge guy={serviceGuyName} /> */}
    </div>
  );
}

export default OwnerDashboard;
