import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    emergencyContactName: "",
    emergencyContactPhone: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateOfBirthChange = (date) => {
    setPersonalDetails((prev) => {
      return { ...prev, dateOfBirth: date };
    });
  };

  const handleFormSubmit = () => {
    console.log(personalDetails);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const isSubmitDisabled =
    personalDetails.phoneNumber === "" ||
    personalDetails.address === "" ||
    personalDetails.dateOfBirth === "";
    personalDetails.emergencyContactName === "" ||
    personalDetails.emergencyContactPhone === "";

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Personal Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in your personal information below.
          </DialogContentText>

          <TextField
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            fullWidth
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label>Date Of Birth:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date of Birth"
                  value={personalDetails.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <TextField
            margin="dense"
            id="emergencyContactName"
            name="emergencyContactName"
            label="Emergency Contact's Name"
            type="text"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="emergencyContactPhone"
            name="emergencyContactPhone"
            label="Emergency Contact's Phone Number"
            type="tel"
            fullWidth
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button disabled={isSubmitDisabled} onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;

