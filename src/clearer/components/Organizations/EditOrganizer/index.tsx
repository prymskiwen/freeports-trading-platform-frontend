import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import ImageUploader from "react-images-upload";
import { useParams, useHistory } from "react-router";

import Manager from "../Manager";
import { useOrganization } from "../../../../hooks";

interface accountType {
  currency: string;
  iban: string;
  account: string;
}
interface managerType {
  id: string;
  nickname: string;
  email: string;
}
const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  boldSpanMarginL: {
    fontWeight: "bold",
    marginLeft: 25,
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
  },
  selectStyle: {
    width: "250px",
    fontSize: 25,
    fontWeight: "initial",
    marginLeft: 15,
  },
  fullCard: {
    height: "100%",
  },
  iconButton: {
    padding: 0,
  },
}));

const EditOrganizer = (): React.ReactElement => {
  const { id }: any = useParams();
  const history = useHistory();
  const classes = useStyle();
  const showingIcon = false;
  const { getOrganizerdetail, getManagers, updateOrganization } =
    useOrganization();
  const [isEditable, setIsEditable] = useState(false);
  const [orgDetail, setOrgDetail] = useState({
    id: "",
    name: "",
    createdAt: "",
    commissionOrganization: "",
    commissionClearer: "",
    logo: "",
    userActive: "",
    userSuspended: "",
    accountList: [],
  });
  const [managers, setManagers] = useState([] as managerType[]);
  const [accounts, setAccounts] = useState<Array<accountType>>([]);

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const detail = await getOrganizerdetail(id);
      const managerList = await getManagers(id);
      if (!mounted) {
        setOrgDetail({
          id: detail.id,
          name: detail.name,
          createdAt: new Date(detail.createdAt).toDateString(),
          logo: detail.logo,
          commissionOrganization: detail.commissionOrganization,
          commissionClearer: detail.commissionClearer,
          userActive: detail.userActive,
          userSuspended: detail.userSuspended,
          accountList: detail.clearing,
        });
        setAccounts(detail.clearing);
        setManagers(managerList);
      }
    };
    init();
    return () => {
      mounted = true;
    };
  }, []);

  const onDrop = (pic: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const newOrgDetail = { ...orgDetail };
      newOrgDetail.logo = e.target.result;
      setOrgDetail(newOrgDetail);
    };
    reader.readAsDataURL(pic[0]);
    // setLogo(pic);
  };

  const onHandleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.name = value;
    setOrgDetail(newOrgDetail);
  };

  const onHandleClearerCommission = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.commissionClearer = value;
    setOrgDetail(newOrgDetail);
  };

  const onHandleOrganizationCommission = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrgDetail = { ...orgDetail };
    newOrgDetail.commissionOrganization = value;
    setOrgDetail(newOrgDetail);
  };

  const onStartEdit = () => {
    if (isEditable) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const onHandleUpdate = async () => {
    await updateOrganization(
      id,
      orgDetail.createdAt,
      orgDetail.name,
      orgDetail.logo,
      orgDetail.commissionOrganization,
      orgDetail.commissionClearer
    )
      .then((data: any) => {
        const responseId = data.id;
        console.log(responseId);
        history.push("/organizations");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const newManager = async () => {
    history.push(`/organizations/${id}/managers/add`);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Card className={classes.fullCard}>
              <CardHeader
                title={
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h5">Edit Organization</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="textSecondary">
                        {`Creation Date: ${orgDetail.createdAt}`}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
              <Divider />
              <CardContent>
                <Grid container direction="row">
                  <TextField
                    type="text"
                    value={orgDetail.name}
                    label="Nickname"
                    variant="outlined"
                    onChange={onHandleNameChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {accounts.map((account) => (
                      <ListItem>
                        <IconButton
                          color="primary"
                          aria-label="Unassign account"
                          component="span"
                        >
                          <RemoveCircle />
                        </IconButton>
                        <Typography variant="body2">{`Account: ${account.iban}`}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Logo</Typography>
                  <Grid container justify="center">
                    <Grid item xs={6}>
                      <CardMedia
                        style={{ marginTop: 20 }}
                        component="img"
                        height="140"
                        image={orgDetail.logo}
                      />
                      <ImageUploader
                        withIcon={showingIcon}
                        withLabel={showingIcon}
                        buttonText="Choose Image"
                        onChange={(ChangeEvent) => onDrop(ChangeEvent)}
                        buttonStyles={{
                          width: "100%",
                        }}
                        fileContainerStyle={{
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Commission rates
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Input
                                  endAdornment={
                                    <InputAdornment position="end">
                                      %
                                    </InputAdornment>
                                  }
                                  value={orgDetail.commissionOrganization}
                                  onChange={onHandleOrganizationCommission}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Clear Commission rates
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Input
                                  endAdornment={
                                    <InputAdornment position="end">
                                      %
                                    </InputAdornment>
                                  }
                                  value={orgDetail.commissionClearer}
                                  onChange={onHandleClearerCommission}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Active Users
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {orgDetail.userActive}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Disabled Users
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {orgDetail.userSuspended}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid container item justify="flex-end" xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onHandleUpdate}
                  >
                    SAVE CHANGES
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.fullCard}>
              <CardHeader
                title={
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography variant="h5">
                        Organization Managers
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="Add manager"
                        onClick={newManager}
                        className={classes.iconButton}
                      >
                        <AddCircle fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                }
              />
              <Divider />
              <CardContent>
                <Grid container>
                  <List>
                    {managers.map((managerItem) => (
                      <ListItem key={managerItem.id}>
                        <Manager organizerid={id} managerid={managerItem.id} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditOrganizer;
