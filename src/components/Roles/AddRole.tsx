import React, { useEffect, useState } from "react";
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
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";

import { useRole } from "../../hooks";

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

interface RoleType {
  name: string;
  permissions: Array<string>;
}
interface PermissionType {
  name: string;
  permissions: Array<{ code: string; name: string }>;
}

const AddRole = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { retrievePermissions, createNewRole } = useRole();
  const [role, setRole] = useState<RoleType>({ name: "", permissions: [] });
  const [permissions, setPermissions] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    await createNewRole(role)
      .then((data: string) => {
        if (data !== "") {
          setLoading(false);
          history.push("/roles");
        }
      })
      .catch((err: any) => setError(err));
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Typography variant="h4">Create new Organisation role</Typography>
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
        </Grid>
      </Container>
    </div>
  );
};

export default AddRole;
