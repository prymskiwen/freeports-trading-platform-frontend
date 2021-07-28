/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  createStyles,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "bootstrap/dist/css/bootstrap.min.css";

import { useRolesSlice } from "./slice";
import {
  selectRoles,
  selectIsRolesLoading,
  selectIsRoleUpdating,
  selectIsRoleRemoving,
  selectPermissions,
  selectIsPermissionsLoading,
} from "./slice/selectors";
/* import { usePermissionsSlice } from "./Add/slice";
import { selectPermissions, selectIsRoleCreating } from "./Add/slice/selectors"; */
import Role from "../../../types/Role";
import Permission from "../../../types/Permission";
import Loader from "../../../components/Loader";

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
      padding: theme.spacing(2),
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
    errorMessage: {
      marginTop: theme.spacing(8),
    },
  })
);

const Roles = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { organizationId } = Lockr.get("USER_DATA");
  const { actions: rolesActions } = useRolesSlice();
  const roles = useSelector(selectRoles);
  const permissions = useSelector(selectPermissions);
  console.log(roles);
  console.log(permissions);
  const rolesLoading = useSelector(selectIsRolesLoading);
  const permissionsLoading = useSelector(selectIsPermissionsLoading);
  const roleUpdating = useSelector(selectIsRoleUpdating);
  const roleRemoving = useSelector(selectIsRoleRemoving);
  /* const roleCreating = useSelector(selectIsRoleCreating);
  const permissions = useSelector(selectPermissions);
  const permissionsLoading = useSelector(selectIsPermissionsLoading); */

  useEffect(() => {
    let unmounted = false;

    const init = async () => {
      dispatch(rolesActions.getRoles(organizationId));
    };

    init();

    return () => {
      unmounted = true;
    };
  }, []);

  const onPermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    roleId: string
  ) => {
    const { name, checked } = event.target;

    /* const newRoles = roles.map((role: RoleType) => {
      if (role.id === roleId) {
        if (checked) role.permissions.push(name);
        else {
          for (let i = 0; i < role.permissions.length; i += 1) {
            if (role.permissions[i] === name) {
              role.permissions.splice(i, 1);
              break;
            }
          }
        }
      }
      return role;
    }); */

    // setRoles(newRoles);
  };

  const onRoleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    roleId: string
  ) => {
    const { value } = event.target;
    /* const newRoles = roles.map((role: RoleType) => {
      const newRole = { ...role };
      if (newRole.id === roleId) {
        newRole.name = value;
      }
      return newRole;
    });
    setRoles(newRoles); */
  };

  const onRoleSave = async (roleId: string) => {
    console.log(roleId);
    // const newRole = roles.filter((role: RoleType) => role.id === roleId)[0];

    /*  setSaving(true);
    setShowAlert(false);
    setSubmitResponse({ type: "", message: "" });

    console.log(newRole);

    await updateRole(roleId, newRole)
      .then((data: string) => {
        if (data !== "") {
          setSaving(false);
          setSubmitResponse({
            type: "success",
            message: "Role has been updated successfully.",
          });
          setShowAlert(true);
        }
      })
      .catch((err: any) => {
        setSaving(false);
        setSubmitResponse({
          type: "error",
          message: err.message,
        });
        setShowAlert(true);
      }); */
  };

  const onRoleRemove = async (roleId: string) => {
    // const newRoles = roles.filter((role: any) => role.id !== roleId);
    /* setRemoving(true);
    setShowAlert(false);
    setSubmitResponse({ type: "", message: "" });
    await removeRole(roleId)
      .then((data: string) => {
        if (data !== "") {
          setRemoving(false);
          setSubmitResponse({
            type: "success",
            message: "Role has been removed successfully.",
          });
          setShowAlert(true);

          const newRoles = roles.filter((role) => role.id !== roleId);
          setRoles(newRoles);
        }
      })
      .catch((err: any) => {
        setSaving(false);
        setSubmitResponse({
          type: "error",
          message: err.message,
        });
        setShowAlert(true);
      }); */
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item alignItems="center" xs={12}>
            <Typography variant="h4">Roles</Typography>
            <Link to="/roles/add">
              <IconButton color="inherit" aria-label="Add Role">
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Link>
          </Grid>
          {rolesLoading && <Loader />}
          {!rolesLoading &&
            (roles.length > 0 ? (
              <Grid container item>
                <Grid item xs={12}>
                  {roles
                    .filter((role: Role) => role.name !== "_default")
                    .map((role: Role) => (
                      <Accordion key={role.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1c-content"
                        >
                          <div className={classes.column}>
                            <Typography className={classes.roleName}>
                              {role.name}
                            </Typography>
                          </div>
                          <div className={classes.column}>
                            <Typography className={classes.roleDescription} />
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container item xs={12}>
                            <Grid item xs={4}>
                              <TextField
                                className={classes.roleNameInput}
                                label="Role Name"
                                value={role.name}
                                onChange={(e) => onRoleNameChange(e, role.id)}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                        {permissions.map((perm: Permission) => (
                          <FormGroup
                            key={perm.name}
                            className={classes.permissionContainer}
                          >
                            <FormLabel
                              component="legend"
                              className={classes.permissionName}
                            >
                              {perm.name}
                            </FormLabel>
                            <AccordionDetails
                              className={classes.permissionDetails}
                            >
                              {perm.permissions.map(
                                (avail: { name: string; code: string }) => (
                                  <div
                                    key={avail.code}
                                    className={classes.column}
                                  >
                                    <FormControlLabel
                                      className={classes.checkboxLabel}
                                      control={
                                        <Checkbox
                                          color="primary"
                                          name={avail.code}
                                          checked={Boolean(
                                            role.permissions.includes(
                                              avail.code
                                            )
                                          )}
                                          onChange={(e) =>
                                            onPermissionChange(e, role.id)
                                          }
                                        />
                                      }
                                      label={avail.name}
                                    />
                                  </div>
                                )
                              )}
                            </AccordionDetails>
                          </FormGroup>
                        ))}
                        <Divider />
                        <AccordionActions>
                          <div className={classes.progressButtonWrapper}>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={roleRemoving}
                              onClick={() => onRoleRemove(role.id)}
                            >
                              Remove
                            </Button>
                            {roleRemoving && (
                              <CircularProgress
                                size={24}
                                className={classes.progressButton}
                              />
                            )}
                          </div>
                          <div className={classes.progressButtonWrapper}>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={() => onRoleSave(role.id)}
                              disabled={roleUpdating}
                            >
                              Save
                            </Button>
                            {roleUpdating && (
                              <CircularProgress
                                size={24}
                                className={classes.progressButton}
                              />
                            )}
                          </div>
                        </AccordionActions>
                      </Accordion>
                    ))}
                </Grid>
              </Grid>
            ) : (
              <></>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Roles;
