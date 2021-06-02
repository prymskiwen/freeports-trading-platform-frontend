import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as dotenv from "dotenv";

dotenv.config();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © {process.env.REACT_APP_NAME} {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (): React.ReactElement => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailErrorText: "",
    password: "",
    confirmPassword: "",
    confirmPasswordErrorText: "",
  });

  const validateEmail = (email: string) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name } = e.target;
    const newValue = e.target.value;

    setFormInput({ ...formInput, [name]: newValue });
  };

  const handleEmailChange = (e: {
    target: { name: string; value: string };
  }) => {
    let errorText = "";
    const { value } = e.target;

    if (!validateEmail(value)) {
      errorText = "Invalid Email Address";
    }
    setFormInput({ ...formInput, emailErrorText: errorText, email: value });
  };

  const handleConfirmPasswordChange = (e: {
    target: { name: string; value: string };
  }) => {
    let errorText = "";
    const { value } = e.target;

    if (value !== formInput.password) {
      errorText = "Passwords are not matched";
    }
    setFormInput({
      ...formInput,
      confirmPassword: value,
      confirmPasswordErrorText: errorText,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstName"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastName"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            helperText={formInput.emailErrorText}
            error={formInput.emailErrorText !== ""}
            type="email"
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            helperText={formInput.confirmPasswordErrorText}
            error={formInput.confirmPasswordErrorText !== ""}
            type="password"
            onChange={handleConfirmPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link to="/signin">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
