/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  TextField,
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
      "& button": {
        margin: "0 10px",
      },
    },
  },
  hiddenFileInput: {
    display: "none",
  },
}));

const Profile = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions } = useProfileSlice();
  const { profile } = useSelector(selectProfile);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const keyfileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(actions.getProfile());
  }, []);

  const onPasswordReset = (values: any) => {
    console.log("Values ", values);
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      setAvatar(URL.createObjectURL(files[0]));
    }
  };

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleImportFileDialogOpen = () => {
    if (keyfileRef.current !== null) keyfileRef.current.click();
  };

  const onCreateCertificate = () => {
    console.log("create");
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                className={classes.cardHeader}
                action={
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleCreateDialogOpen}
                    >
                      Create Certificate
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleImportFileDialogOpen}
                    >
                      Import Key
                    </Button>
                    <input
                      ref={keyfileRef}
                      type="file"
                      id="keyfile"
                      name="keyfile"
                      className={classes.hiddenFileInput}
                    />
                  </>
                }
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Personal Info" />
              <Divider />
              <CardContent>
                <Grid container alignItems="flex-start" spacing={2}>
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
                          fullWidth
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
                          fullWidth
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
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item sm={12}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          id="jobTitle"
                          name="jobTitle"
                          label="Job Title"
                          variant="outlined"
                          value={profile.jobTitle}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Grid container alignItems="center" justify="center">
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
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
                              fullWidth
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
                              fullWidth
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
                  <Button color="primary" variant="contained" type="submit">
                    Reset
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Dialog
            open={createDialogOpen}
            onClose={handleCreateDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Certificate</DialogTitle>
            <Divider />
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="key"
                    label="Key name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleCreateDialogClose} variant="contained">
                Cancel
              </Button>
              <Button
                onClick={onCreateCertificate}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
