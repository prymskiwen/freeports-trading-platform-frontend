/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { TextField, Select } from "mui-rff";
import { useHistory } from "react-router";
import {
  Button,
  Checkbox,
  Container,
  createStyles,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";

import { useNewOrgRoleSlice } from "./slice";
import {
  selectOrgPermissions,
  selectIsOrgPermissionsLoading,
} from "./slice/selectors";
import actions from "../../../../store/actions";

interface RoleType {
  name: string;
  permissions: Array<string>;
}
interface PermissionType {
  name: string;
  permissions: Array<{ code: string; name: string }>;
}

const validate = (values: any) => {
  const errors: Partial<RoleType> = {};

  if (!values.name) {
    errors.name = "This Field Required";
  }

  return errors;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    roleName: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: "bold",
    },
    roleDescription: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.text.secondary,
    },
    permissionContainer: {
      padding: theme.spacing(1),
      border: theme.palette.warning.main,
    },
    permissionDetails: {
      maxHeight: "40px",
      alignItems: "center",
      padding: "0px",
    },
    permissionName: {
      fontWeight: "bold",
    },
    checkboxLabel: {
      margin: "0px",
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
    column: {
      flexBasis: "20%",
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    roleNameInput: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

const NewOrgRole = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { organizationId } = Lockr.get("USER_DATA");
  const { actions: newOrgRoleActions } = useNewOrgRoleSlice();
  const orgPermissions = useSelector(selectOrgPermissions);
  console.log("permissions: ", orgPermissions);
  const orgPermissionsLoading = useSelector(selectIsOrgPermissionsLoading);
  const [orgRole, setOrgRole] = useState<RoleType>({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    let unmounted = false;

    const init = async () => {
      dispatch(newOrgRoleActions.getOrgPermissions(organizationId));
    };

    init();

    return () => {
      unmounted = true;
    };
  }, []);

  const handleRoleCreate = (values: RoleType) => {
    console.log(values);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Typography variant="h4">Create new Organization role</Typography>
          </Grid>
          <Form
            onSubmit={handleRoleCreate}
            mutators={{
              ...arrayMutators,
            }}
            initialValues={orgRole}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              pristine,
              form: {
                mutators: { push },
              },
              values,
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <TextField
                      className={classes.roleNameInput}
                      label="Role Name"
                      name="name"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  {orgPermissions.map((perm: PermissionType) => (
                    <Grid item key={perm.name} xs={12}>
                      <FormGroup className={classes.permissionContainer}>
                        <FormLabel
                          component="legend"
                          className={classes.permissionName}
                        >
                          {perm.name}
                        </FormLabel>
                        <Grid container>
                          {perm.permissions.map(
                            (avail: { name: string; code: string }) => (
                              <Grid item key={avail.code} xs={2}>
                                {/* <Grid container alignItems="center" spacing={1}>
                                  <Grid item>
                                    <Field
                                      name="permissions[]"
                                      component="input"
                                      type="checkbox"
                                      value={avail.code}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography variant="body1">
                                      {avail.name}
                                    </Typography>
                                  </Grid>
                                </Grid> */}
                                <FormControlLabel
                                  className={classes.checkboxLabel}
                                  control={
                                    <Field name="permissions[]" type="checkbox">
                                      {(props) => (
                                        <Checkbox
                                          color="primary"
                                          value={avail.code}
                                        />
                                      )}
                                    </Field>
                                  }
                                  label={avail.name}
                                />
                              </Grid>
                            )
                          )}
                        </Grid>
                      </FormGroup>
                    </Grid>
                  ))}
                </Grid>
                <Divider variant="middle" />
                <Grid container justify="flex-end">
                  <div className={classes.progressButtonWrapper}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={submitting || pristine}
                    >
                      Create Role
                    </Button>
                  </div>
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default NewOrgRole;
