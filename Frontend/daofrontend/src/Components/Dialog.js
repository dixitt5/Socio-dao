import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Dialog1 = (props) => {
  return (
    <div className="dialog">
      <Dialog open={true}>
        // true
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
            id="standard-multiline-static"
            label="Details"
            multiline
            rows={4}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Submit</Button>
          <Button variant="outlined" onClick={props.setoff}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dialog1;
