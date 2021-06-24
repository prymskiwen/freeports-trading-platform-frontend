/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import arrayMutators from "final-form-arrays";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { useProfileSlice } from "./slice";
import { selectProfile } from "./slice/selectors";
import defaultAvatar from "../../../assets/images/profile.jpg";

const useStyles = makeStyles((theme) => ({
  saveBtn: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  profileImageContainer: {
    position: "relative",
    width: 200,
    height: 200,
    "&:hover, &:focus": {
      "& $profileImage": {
        opacity: 0.5,
      },
    },
  },
  profileImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  fileInput: {
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "pointer",
  },
  cardHeader: {
    "& .MuiCardHeader-action": {
      marginTop: 0,
    },
  },
}));

const profileValidate = (values: any) => {
  const errors: {
    nickname?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  } = {};
  if (!values.nickname) {
    errors.nickname = "This Field Required";
  }

  if (!values.email) {
    errors.email = "This Field Required";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid Email";
  }

  if (!values.phone) {
    errors.phone = "This Field Required";
  }

  if (
    // eslint-disable-next-line no-useless-escape
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      values.phone
    )
  ) {
    errors.phone = "Please enter a valid Phone number";
  }
  return errors;
};

const passwordValidate = (values: any) => {
  const errors: {
    password?: string;
    confirmPassword?: string;
  } = {};
  if (!values.password) {
    errors.password = "This Field Required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "This Field Required";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

const Profile = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions } = useProfileSlice();
  const { profile } = useSelector(selectProfile);
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    dispatch(actions.getProfile());
  }, []);

  const onProfileUpdate = (values: any) => {
    console.log("Values ", values);
  };

  const onPasswordReset = (values: any) => {
    console.log("Values ", values);
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      console.log(URL.createObjectURL(files[0]));
      setAvatar(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Form
              onSubmit={onProfileUpdate}
              mutators={{
                ...arrayMutators,
              }}
              validate={profileValidate}
              render={({
                handleSubmit,
                form: {
                  mutators: { push, pop },
                },
                values,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Card>
                    <CardHeader title="Personal Info" />
                    <Divider />
                    <CardContent>
                      <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item sm={12} md={6}>
                              <Grid container spacing={3}>
                                <Grid item sm={12}>
                                  <TextField
                                    InputProps={{ readOnly: true }}
                                    id="nickname"
                                    name="nickname"
                                    label="Nickname"
                                    variant="outlined"
                                    value={profile.nickname}
                                  />
                                </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                <Grid item sm={12} md={6}>
                                  <TextField
                                    InputProps={{ readOnly: true }}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={profile.email}
                                  />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                  <TextField
                                    InputProps={{ readOnly: true }}
                                    label="Phone"
                                    name="phone"
                                    id="phone"
                                    variant="outlined"
                                    value={profile.phone}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item sm={12} md={6}>
                              <Grid
                                container
                                alignItems="center"
                                justify="center"
                              >
                                <div className={classes.profileImageContainer}>
                                  <Avatar
                                    src={avatar}
                                    alt="Avatar"
                                    className={classes.profileImage}
                                  />
                                  <input
                                    type="file"
                                    name="avatar"
                                    className={classes.fileInput}
                                    onChange={onAvatarChange}
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {/* <Divider />
                    <CardActions>
                      <Grid container direction="row-reverse">
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </Grid>
                    </CardActions> */}
                  </Card>
                </form>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Form
              onSubmit={onPasswordReset}
              mutators={{
                ...arrayMutators,
              }}
              validate={passwordValidate}
              render={({
                handleSubmit,
                form: {
                  mutators: { push, pop },
                },
                values,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Card>
                    <CardHeader title="Reset Password" />
                    <Divider />
                    <CardContent>
                      <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item sm={12} md={6}>
                              <Grid container spacing={3}>
                                <Grid item sm={12}>
                                  <TextField
                                    required
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                <Grid item sm={12}>
                                  <TextField
                                    required
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Grid container direction="row-reverse">
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Reset
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </form>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="OTP Secret KEY"
                className={classes.cardHeader}
                action={
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ marginTop: 0 }}
                  >
                    Reset
                  </Button>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
