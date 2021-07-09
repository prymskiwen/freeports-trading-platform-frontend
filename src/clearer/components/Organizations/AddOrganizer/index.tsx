import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { useHistory } from "react-router";

import { useOrganization, useAccounts } from "../../../../hooks";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginL10: {
    marginLeft: 10,
  },
  profileImageContainer: {
    position: "relative",
    width: 150,
    height: 150,
    margin: 20,
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
  profileFileInput: {
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "pointer",
  },
}));

const onValidate = (values: any) => {
  const errors: {
    name?: string;
    commissionOrganization?: string;
    commissionClearer?: string;
  } = {};

  if (!values.name) {
    errors.name = "This Field Required";
  }
  // if(!values.street1){
  //   errors.street1 = "This Field Required";
  // }
  // if(!values.street2){
  //   errors.street2 = "This Field Required";
  // }
  // if(!values.zip){
  //   errors.zip = "This Field Required";
  // }
  // if(!values.city){
  //   errors.city = "This Field Required";
  // }
  // if(!values.country){
  //   errors.country = "This Field Required";
  // }
  if (!values.commissionOrganization) {
    errors.commissionOrganization = "This Field Required";
  }
  if (!values.commissionClearer) {
    errors.commissionClearer = "This Field Required";
  }
  return errors;
};

interface accountType {
  id: string;
  name: string;
  currency: string;
  type: string;
  iban: string;
}

const AddOrganizer = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const [avatar, setAvatar] = useState();

  const [accounts, setAccounts] = useState([] as accountType[]);
  const [selectedAccounts, setSelectedAccounts] = useState([] as string[]);

  const { addOrganization } = useOrganization();
  const { allAccounts, assignAccount } = useAccounts();

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const accountList = await allAccounts();
      if (!mounted) {
        setAccounts(accountList);
      }
    };

    init();
    return () => {
      mounted = true;
    };
  }, []);

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onHandleAccountSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { value } = event.target;
    setSelectedAccounts(value as string[]);
  };

  const onsubmit = async (values: any) => {
    await addOrganization(
      values.name,
      values.street1,
      values.street2,
      values.zip,
      values.city,
      values.country,
      avatar,
      values.commissionOrganization,
      values.commissionClearer
    )
      .then((data: any) => {
        const responseId = data.id;
        if (selectedAccounts.length > 0) {
          selectedAccounts.map(async (accountItem, key) => {
            await assignAccount(responseId, accountItem).then((res: any) => {
              if (key === selectedAccounts.length - 1) {
                history.push("/organizations");
              }
            });
          });
        } else {
          history.push("/organizations");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Form
          onSubmit={onsubmit}
          initialValues={{
            name: "",
            street1: "",
            street2: "",
            zip: "",
            city: "",
            country: "",
            commissionOrganization: "",
            commissionClearer: "",
          }}
          validate={onValidate}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Card>
                <CardHeader title="Create new organization" />
                <Divider />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <TextField
                              required
                              label="Organization name"
                              name="name"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <TextField
                              label="Street 1"
                              name="street1"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <TextField
                              label="Street 2"
                              name="street2"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  label="zip"
                                  name="zip"
                                  variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  label="City"
                                  name="city"
                                  variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <TextField
                              label="Country"
                              name="country"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        {accounts.length > 0 ? (
                          <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                              <Select
                                multiple
                                displayEmpty
                                value={selectedAccounts}
                                onChange={onHandleAccountSelect}
                                renderValue={(selected: any) => {
                                  if (selected.length === 0) {
                                    return <em>Nostro accounts</em>;
                                  }

                                  return selected.join(", ");
                                }}
                              >
                                <MenuItem disabled value="">
                                  <em>Nostro accounts</em>
                                </MenuItem>
                                {accounts.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  aria-required
                                  label="Organization commission rate"
                                  name="commissionOrganization"
                                  variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  required
                                  label="Clearer commission rate"
                                  name="commissionClearer"
                                  variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container justify="center" alignItems="center">
                        <div className={classes.profileImageContainer}>
                          <Avatar
                            src={avatar}
                            alt="Avatar"
                            className={classes.profileImage}
                          />
                          <input
                            type="file"
                            name="avatar"
                            className={classes.profileFileInput}
                            onChange={onAvatarChange}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </form>
          )}
        />
      </Container>
    </div>
  );
};

export default AddOrganizer;
