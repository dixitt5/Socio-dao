import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const history = useNavigate();
  return (
    <div>
      <Dialog open={true}>
        {/*  true */}
        <DialogTitle>Owner DashBoard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the plans to be managed as proposed by the DAO..
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter the name of the service"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="details of the service"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              history("/");
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OwnerDashboard;
