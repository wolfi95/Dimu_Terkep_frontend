import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const RequesetFailedAlert = (props) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  return (
    <div className="alertBarBlock">
      <Snackbar
        open={props.open}
        autoHideDuration={4000}
        onClose={handleClose}
        className="alertBar"
      >
        <Alert onClose={handleClose} severity="error">
          A szerver jelenleg nem elérhető.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RequesetFailedAlert;
