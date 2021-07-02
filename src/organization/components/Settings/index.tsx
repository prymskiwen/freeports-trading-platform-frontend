/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Icon,
  Input,
  InputAdornment,
  List,
  ListItem,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { useOrganization } from "../../../hooks";

interface ibantype {
  currency: string;
  iban: string;
  account: string;
}
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    marginL10: {
      marginLeft: 10,
    },
    managerName: {
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 15,
    },
    logoText: {
      fontSize: 20,
      fontWeight: "bold",
      margin: "10px 0px",
    },
    selectStyle: {
      width: "250px",
      fontSize: 25,
      fontWeight: "initial",
      marginLeft: 15,
    },
    logoImageContainer: {
      position: "relative",
      width: 200,
      height: 200,
      "&:hover, &:focus": {
        "& $logoImage": {
          opacity: 0.5,
        },
      },
    },
    logoImage: {
      width: "100%",
      height: "100%",
      opacity: 1,
    },
    logoFileInput: {
      opacity: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      cursor: "pointer",
    },

    progressButtonWrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    progressButton: {
      color: theme.palette.primary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Settings = (): React.ReactElement => {
  const { organizationId } = Lockr.get("USER_DATA");
  const classes = useStyle();
  const { getOrganizerdetail, updateOrganization } = useOrganization();
  const [orgDetail, setOrgDetail] = useState({
    id: "string",
    name: "string",
    createdAt: "string",
    commissionOrganization: "string",
    commissionClearer: "string",
    logo: "string",
    userActive: "string",
    userSuspended: "string",
  });
  const [iban, setIban] = useState([] as ibantype[]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({
    type: "success",
    message: "",
  });

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const detail = await getOrganizerdetail(organizationId);
      if (!mounted) {
        if (detail) {
          setOrgDetail({
            id: detail.id,
            name: detail.name,
            createdAt: new Date(detail.createdAt).toDateString(),
            logo: detail.logo,
            commissionOrganization: detail.commissionOrganization,
            commissionClearer: detail.commissionClearer,
            userActive: detail.acitveUser,
            userSuspended: detail.discativeUser,
          });
          setIban(detail.clearing);
        }
      }
    };
    init();
    return () => {
      mounted = true;
    };
  }, []);

  const onLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      const newOrgDetail = { ...orgDetail };
      newOrgDetail.logo = URL.createObjectURL(files[0]);
      setOrgDetail(newOrgDetail);
    }
  };

  const handleName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.name = value;
    setOrgDetail(newOrgDetail);
  };

  const handleClearer = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.commissionClearer = value;
    setOrgDetail(newOrgDetail);
  };

  const handleCommission = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.commissionOrganization = value;
    setOrgDetail(newOrgDetail);
  };

  const handleDialog = () => {
    console.log(orgDetail);
  };

  const onHandleUpdate = async () => {
    setLoading(true);
    setShowAlert(false);

    await updateOrganization(
      organizationId,
      orgDetail.createdAt,
      orgDetail.name,
      orgDetail.logo,
      orgDetail.commissionOrganization,
      orgDetail.commissionClearer
    )
      .then((data: string) => {
        if (data !== "") {
          setLoading(false);
          setSubmitResponse({
            type: "success",
            message: "Updated successfully.",
          });
          setShowAlert(true);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        setSubmitResponse({
          type: "error",
          message: err.message,
        });
        setShowAlert(true);
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Card>
          <CardHeader title="Settings" />
          <Divider />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      label="Nickname"
                      variant="outlined"
                      value={orgDetail.name}
                      onChange={handleName}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <List>
                    {iban.map((ibanItem) => (
                      <ListItem>
                        <Icon color="error">remove_circle</Icon>
                        <Typography>IBAN: </Typography>
                        <Typography>{ibanItem.iban}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <List>
                    <ListItem onClick={handleDialog}>
                      <Icon style={{ fontSize: 35 }}>add_circle</Icon>
                      <span className={classes.marginL10}>Add IBAN</span>
                    </ListItem>
                  </List>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <Grid container xs={12}>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            Commission rates
                          </span>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            Clear Commission rates
                          </span>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <Input
                            endAdornment={
                              <InputAdornment position="end">%</InputAdornment>
                            }
                            value={orgDetail.commissionOrganization}
                            onChange={handleCommission}
                          />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <Input
                            endAdornment={
                              <InputAdornment position="end">%</InputAdornment>
                            }
                            value={orgDetail.commissionClearer}
                            onChange={handleClearer}
                          />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            Active Users
                          </span>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            Disabled Users
                          </span>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            {orgDetail.userActive}
                          </span>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 15 }}>
                          <span style={{ fontWeight: "bold" }}>
                            {orgDetail.userSuspended}
                          </span>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="center">
                  <Typography className={classes.logoText}>Logo</Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  alignItems="center"
                  justify="center"
                >
                  <div className={classes.logoImageContainer}>
                    <Avatar
                      src={orgDetail.logo}
                      alt="Avatar"
                      className={classes.logoImage}
                    />
                    <input
                      type="file"
                      name="avatar"
                      className={classes.logoFileInput}
                      onChange={onLogoFileChange}
                    />
                  </div>
                  {/* <CardMedia
                    style={{ marginTop: 20 }}
                    component="img"
                    height="140"
                    image={orgDetail.logo}
                  />
                  <ImageUploader
                    withIcon={showingIcon}
                    withLabel={showingIcon}
                    buttonText="Choose Image"
                    onChange={(ChangeEvent) => ondrop(ChangeEvent)}
                    buttonStyles={{
                      width: "100%",
                    }}
                    fileContainerStyle={{
                      margin: 0,
                      padding: 0,
                    }}
                  /> */}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container item justify="flex-end" xs={12}>
              <div className={classes.progressButtonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onHandleUpdate}
                  disabled={loading}
                >
                  SAVE CHANGES
                </Button>

                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.progressButton}
                  />
                )}
              </div>
            </Grid>
          </CardActions>
        </Card>
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showAlert}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={submitResponse.type === "success" ? "success" : "error"}
          >
            {submitResponse.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Settings;
