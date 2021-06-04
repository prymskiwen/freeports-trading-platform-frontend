import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Redirect } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import * as dotenv from "dotenv";

import useAuth from "../../../hooks";

dotenv.config();

const Copyright = (): React.ReactElement => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © {process.env.REACT_APP_NAME} {new Date().getFullYear()}.
    </Typography>
  );
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  qrCode: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const OTPSignIn = (): React.ReactElement => {
  const { isSignInAuthenticated, isAuthenticated, error, checkOTP } = useAuth();
  const classes = useStyles();
  const [OTPassword, setOTPassword] = useState("");

  const handleInput = (e: { target: { name: string; value: string } }) => {
    const { value } = e.target;

    setOTPassword(value);
  };

  const handleOTPSubmit = (e: any) => {
    e.preventDefault();

    checkOTP(OTPassword);
  };

  if (!isSignInAuthenticated) {
    return <Redirect to="/signin" />;
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="subtitle1" align="center">
          Scan this QR Code image with any Google Authenticator compatible
          program
        </Typography>
        <div className={classes.qrCode}>
          <QRCode value="demo" />
        </div>
        <form className={classes.form} onSubmit={handleOTPSubmit}>
          {error !== "" ? (
            <Typography component="h3" variant="h5" color="error">
              {error}
            </Typography>
          ) : (
            <></>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm the OTP code"
            type="password"
            id="password"
            onChange={handleInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default OTPSignIn;
