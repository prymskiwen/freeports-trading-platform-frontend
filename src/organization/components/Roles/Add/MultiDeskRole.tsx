/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
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
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import "bootstrap/dist/css/bootstrap.min.css";

import { useRole } from "../../../../hooks";

interface RoleType {
  name: string;
  permissions: Array<string>;
}
interface PermissionType {
  name: string;
  permissions: Array<{ code: string; name: string }>;
}

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

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const NewMultiDeskRole = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { retrievePermissions, createNewRole } = useRole();
  const [role, setRole] = useState<RoleType>({ name: "", permissions: [] });
  const [permissions, setPermissions] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({
    type: "success",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const timer = React.useRef<number>();

  useEffect(() => {
    let unmounted = false;

    const init = async () => {
      const permissionList = await retrievePermissions();

      if (!unmounted) {
        setPermissions(permissionList);
      }
    };

    init();

    return () => {
      unmounted = true;
    };
  }, []);

  const onPermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    const newRole = { ...role };

    if (checked) newRole.permissions.push(name);
    else {
      for (let i = 0; i < newRole.permissions.length; i += 1) {
        if (newRole.permissions[i] === name) {
          newRole.permissions.splice(i, 1);
          break;
        }
      }
    }
    console.log(newRole);

    setRole(newRole);
  };

  const onRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newRole = { ...role };
    newRole.name = value;

    setRole(newRole);
  };

  const onRoleCreate = async () => {
    setLoading(true);
    setShowAlert(false);
    await createNewRole(role)
      .then((data: string) => {
        if (data !== "") {
          setSubmitResponse({
            type: "success",
            message: "New role has been created successfully.",
          });
          setShowAlert(true);
          timer.current = window.setTimeout(() => {
            setLoading(false);
            history.push("/roles");
          }, 2000);
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
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Typography variant="h4">Create new Multi-desk role</Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <TextField
                className={classes.roleNameInput}
                label="Role Name"
                value={role.name}
                onChange={onRoleNameChange}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            {permissions.map((perm: PermissionType) => (
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
                          <FormControlLabel
                            className={classes.checkboxLabel}
                            control={
                              <Checkbox
                                color="primary"
                                name={avail.code}
                                checked={Boolean(
                                  role.permissions.includes(avail.code)
                                )}
                                onChange={onPermissionChange}
                              />
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
                size="large"
                color="primary"
                onClick={onRoleCreate}
                disabled={loading}
              >
                Create Role
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.progressButton}
                />
              )}
            </div>
          </Grid>
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
        </Grid>
      </Container>
    </div>
  );
};

export default NewMultiDeskRole;
