import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container, IconButton, Divider, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../assets/images/profile.jpg";
import { useCoWorkerFormSlice } from "./slice";
import { selectRoles } from "./slice/selectors";
import User from "../../../types/User";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    width: 230,
  },
  toolbar: theme.mixins.toolbar,
  listTitle: {
    display: "flex",
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectRole: {
    width: 300,
  },
  roleSelectContainer: {
    display: "flex",
  },
  textInput: {
    minWidth: 230,
    margin: theme.spacing(2),
  },
  saveBtn: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  profileImageContainer: {
    position: "relative",
    maxWidth: 200,
  },
  profileImage: {
    width: "100%",
  },
  changeImageBtn: {
    position: "absolute",
    bottom: 45,
    left: 0,
  },
}));

const validate = (values: any) => {
  const errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    jobTitle?: string;
    phone?: string;
  } = {};
  if (!values.firstName) {
    errors.firstName = "This Field Required";
  }
  if (!values.lastName) {
    errors.lastName = "This Field Required";
  }

  if (!values.email) {
    errors.email = "This Field Required";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid Email";
  }

  if (!values.jobTitle) {
    errors.jobTitle = "This Field Required";
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

interface Props {
  // eslint-disable-next-line react/require-default-props
  coWorker?: Partial<User>;
}

const CoWorkerForm = (
  { coWorker }: Props = {
    coWorker: {
      roles: [""],
      nickname: "",
    },
  }
): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions } = useCoWorkerFormSlice();
  const existingRoles = useSelector(selectRoles);
  const onSubmit = (values: any) => {
    console.log("Values ", values);
  };

  useEffect(() => {
    dispatch(actions.getRoles());
  }, []);

  console.log("Roles ", existingRoles);
  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={coWorker}
        validate={validate}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop },
          },
          values,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={8}>
                <FieldArray name="roles">
                  {({ fields }) =>
                    fields.map((name, i) => (
                      <Grid container key={name} spacing={2}>
                        <Grid item sm={10} md={8}>
                          <Select
                            native
                            name={name}
                            inputProps={{
                              name: "role",
                              id: "role-select",
                            }}
                            autoWidth
                            label="Role"
                            variant="outlined"
                          >
                            <option aria-label="None" value="" />

                            {existingRoles
                              .filter((role) =>
                                values.roles[i] === role.id
                                  ? true
                                  : !values.roles.includes(role.id)
                              )
                              .map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                          </Select>
                        </Grid>
                        {i !== 0 && (
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => pop("roles")}
                              aria-label="Add role"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Grid>
                        )}
                        {fields &&
                          i === (fields.length || 0) - 1 &&
                          (fields.length || 0) < existingRoles.length && (
                            <Grid item xs={1}>
                              <IconButton
                                onClick={() => push("roles", "")}
                                aria-label="Add role"
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          )}
                      </Grid>
                    ))
                  }
                </FieldArray>
              </Grid>

              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Select
                      label="Status"
                      native
                      name="status"
                      variant="outlined"
                      inputProps={{
                        name: "status",
                        id: "status-select",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="ACTIVE">Active</option>
                      <option value="DISABLED">Disabled</option>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item sm={12} md={9}>
                    <Grid container spacing={3}>
                      <Grid item sm={12}>
                        <TextField
                          required
                          id="nickname"
                          name="nickname"
                          label="Nickname"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item sm={12} md={6}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <TextField
                          required
                          label="Phone"
                          name="phone"
                          id="phone"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item sm={12} md={6}>
                        <TextField
                          id="job-title"
                          label="Jub title"
                          name="jobTitle"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={3}
                    className={classes.profileImageContainer}
                  >
                    <img
                      src={profile}
                      alt="Co-worker"
                      className={classes.profileImage}
                    />
                    <Button fullWidth className={classes.changeImageBtn}>
                      Change image
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row-reverse">
                <Button className={classes.saveBtn} type="submit">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Container>
  );
};

export default CoWorkerForm;
