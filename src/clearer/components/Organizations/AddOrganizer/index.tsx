import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import ImageUploader from "react-images-upload";
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
  const showingIcon = false;
  const showingLogo = true;
  const [logoImage, setLogoImage] = useState();

  const [accounts, setAccounts] = useState([] as accountType[]);
  const [selectedAccounts, setSelectedAccounts] = useState([] as string[]);

  const { addOrganization } = useOrganization();
  const { allAccounts, assignAccount } = useAccounts();

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const getaccounts = await allAccounts();
      if (!mounted) {
        setAccounts(getaccounts);
      }
    };

    init();
    return () => {
      mounted = true;
    };
  }, []);

  const onPicker = (pic: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setLogoImage(e.target.result);
    };
    reader.readAsDataURL(pic[0]);
  };

  const onHanelsetAccount = (event: React.ChangeEvent<{ value: unknown }>) => {
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
      logoImage,
      values.commissionOrganization,
      values.commissionClearer
    )
      .then((data: any) => {
        const responseId = data.id;
        console.log(responseId);
        if (selectedAccounts.length > 0) {
          selectedAccounts.map(async (accountItem, key) => {
            await assignAccount(responseId, accountItem).then((res: any) => {
              console.log(res);
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
              <Grid container item spacing={1} xs={6}>
                <Grid item xs={12}>
                  <h2>CREATE NEW ORGANIZATION</h2>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      required
                      id="outlined-adornment-amount"
                      label="Organization name"
                      name="name"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      id="outlined-adornment-amount"
                      label="Street 1"
                      name="street1"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      id="outlined-adornment-amount"
                      label="Street 2"
                      name="street2"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      id="outlined-adornment-amount"
                      label="zip"
                      name="zip"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      id="outlined-adornment-amount"
                      label="City"
                      name="city"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <TextField
                      id="outlined-adornment-amount"
                      label="Country"
                      name="country"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <span style={{ fontWeight: "bold" }}>Nostro Accounts</span>

                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={selectedAccounts}
                      onChange={onHanelsetAccount}
                    >
                      {accounts.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ padding: 10 }}>
                  <span style={{ fontWeight: "bold" }}>
                    Add Organization logo
                  </span>
                  <FormControl fullWidth style={{ marginTop: 5 }}>
                    <ImageUploader
                      withIcon={showingIcon}
                      withLabel={showingIcon}
                      buttonText="Choose Image"
                      onChange={(ChangeEvent) => onPicker(ChangeEvent)}
                      buttonStyles={{
                        width: "100%",
                        padding: 10,
                        fontSize: 20,
                      }}
                      fileContainerStyle={{
                        margin: 0,
                        padding: 0,
                      }}
                      withPreview={showingLogo}
                      singleImage={showingLogo}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  spacing={3}
                  xs={12}
                  style={{ padding: 10 }}
                >
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <TextField
                        required
                        id="outlined-adornment-amount"
                        label="Set organization commission rate"
                        name="commissionOrganization"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <TextField
                        required
                        id="outlined-adornment-amount"
                        label="Set clearer commission rate"
                        name="commissionClearer"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  justify="flex-end"
                  xs={12}
                  style={{ padding: 10 }}
                >
                  <Button variant="contained" color="secondary" type="submit">
                    SAVE NEW ORGANIZATION
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Container>
    </div>
  );
};

export default AddOrganizer;
