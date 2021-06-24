import { Snackbar as MUISnackbar } from "@material-ui/core";
import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const Alert = (props: AlertProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snackbar = ({
  handleAlertClose,
  open,
  message,
}: any): React.ReactElement => {
  return (
    <MUISnackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleAlertClose}
    >
      <Alert
        onClose={handleAlertClose}
        severity={message.type === "success" ? "success" : "error"}
      >
        {message.message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
