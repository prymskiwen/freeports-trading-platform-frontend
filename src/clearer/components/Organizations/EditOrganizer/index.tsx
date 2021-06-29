import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  IconButton,
  Button,
  Icon,
  Divider,
  List,
  ListItem,
  CardMedia,
  Card,
  Input,
  InputAdornment,
} from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { useParams, useHistory } from "react-router";
import Manager from "../Manager";

import { useOrganization } from "../../../../hooks";

interface ibantype {
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
  boldspanMarginL: {
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
  logotext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectStyle: {
    width: "250px",
    fontSize: 25,
    fontWeight: "initial",
    marginLeft: 15,
  },
  profilBtn: {
    position: "relative",
    height: 150,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
  },
  profilImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  profiltext: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "#fff9",
    width: "100%",
    textAlign: "center",
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
  const [organizereddetail, setOrganizereddetail] = useState({
    id: "string",
    name: "string",
    createdAt: "string",
    commissionOrganization: "string",
    commissionClearer: "string",
    logo: "string",
    userActive: "string",
    userSuspended: "string",
  });
  const [managers, setManagers] = useState([] as managerType[]);
  const [iban, setIban] = useState([] as ibantype[]);
  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const detail = await getOrganizerdetail(id);
      const managerList = await getManagers(id);
      if (!mounted) {
        setOrganizereddetail({
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
        setManagers(managerList);
      }
    };
    init();
    return () => {
      mounted = true;
    };
  }, []);

  const ondrop = (pic: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const newOrganizereddetail = { ...organizereddetail };
      newOrganizereddetail.logo = e.target.result;
      setOrganizereddetail(newOrganizereddetail);
    };
    reader.readAsDataURL(pic[0]);
    // setLogo(pic);
  };

  const onHandlename = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrganizereddetail = { ...organizereddetail };
    newOrganizereddetail.name = value;
    setOrganizereddetail(newOrganizereddetail);
  };

  const onHandleclearer = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrganizereddetail = { ...organizereddetail };
    newOrganizereddetail.commissionClearer = value;
    setOrganizereddetail(newOrganizereddetail);
  };

  const onHandlecommission = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newOrganizereddetail = { ...organizereddetail };
    newOrganizereddetail.commissionOrganization = value;
    setOrganizereddetail(newOrganizereddetail);
  };

  const onhandledialog = () => {
    console.log(organizereddetail);
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
      organizereddetail.createdAt,
      organizereddetail.name,
      organizereddetail.logo,
      organizereddetail.commissionOrganization,
      organizereddetail.commissionClearer
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
    history.push(`/organizations/${id}/addmanager`);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <div style={{ width: "100%", display: "flex" }}>
          <Grid item xs={6}>
            <Grid container direction="row">
              {isEditable ? (
                <Input
                  type="text"
                  value={organizereddetail.name}
                  onChange={onHandlename}
                  style={{ fontSize: 25, fontWeight: "bold" }}
                />
              ) : (
                <h2> {organizereddetail.name}</h2>
              )}

              <IconButton onClick={onStartEdit}>
                {isEditable ? (
                  <Icon style={{ fontSize: 35 }}>save</Icon>
                ) : (
                  <Icon style={{ fontSize: 35 }}>mode</Icon>
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <span>Creation Date:</span>
                  <span className={classes.boldspanMarginL}>
                    {organizereddetail.createdAt}
                  </span>
                </ListItem>
              </List>
              <Divider />
              <List>
                {iban.map((ibanItem) => (
                  <ListItem>
                    <Icon color="error">remove_circle</Icon>
                    <span className={classes.marginL10}>IBAN: </span>
                    <span className={classes.boldspanMarginL}>
                      {ibanItem.iban}
                    </span>
                  </ListItem>
                ))}
              </List>
              <List>
                <ListItem onClick={onhandledialog}>
                  <Icon style={{ fontSize: 35 }}>add_circle</Icon>
                  <span className={classes.marginL10}>Add IBAN</span>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <span className={classes.logotext}>Logo</span>
                <Grid item container xs={12} justify="center">
                  <CardMedia
                    style={{ marginTop: 20 }}
                    component="img"
                    height="140"
                    image={organizereddetail.logo}
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
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <Grid container xs={12}>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold" }}>Commission rates</span>
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
                      value={organizereddetail.commissionOrganization}
                      onChange={onHandlecommission}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <Input
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                      value={organizereddetail.commissionClearer}
                      onChange={onHandleclearer}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold" }}>Active Users</span>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold" }}>Disabled Users</span>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold" }}>
                      {organizereddetail.userActive}
                    </span>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold" }}>
                      {organizereddetail.userSuspended}
                    </span>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid
              container
              item
              justify="flex-end"
              xs={12}
              style={{ marginTop: 5 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onHandleUpdate}
              >
                SAVE CHANGES
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row">
              <h2>
                Organization managers
                <IconButton onClick={newManager}>
                  <Icon style={{ fontSize: 45 }} color="primary">
                    add_circle
                  </Icon>
                </IconButton>
              </h2>
            </Grid>
            <Grid item xs={12}>
              <List>
                {managers.map((managerItem) => (
                  <ListItem>
                    <Manager organizerid={id} managerid={managerItem.id} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default EditOrganizer;
