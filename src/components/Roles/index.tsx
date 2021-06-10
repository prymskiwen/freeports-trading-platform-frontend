import React, { useEffect, useState } from "react";
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
  Theme,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  })
);

interface RoleType {
  id: string;
  name: string;
  permissions: Array<string>;
}
interface PermissionType {
  name: string;
  permissions: Array<{ code: string; name: string }>;
}

const Roles = (): React.ReactElement => {
  const classes = useStyles();
  const { retrieveRoles, retrievePermissions } = useRole();
  const [roles, setRoles] = useState([] as any[]);
  const [permissions, setPermissions] = useState([] as any[]);
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);
  const timer = React.useRef<number>();

  useEffect(() => {
    let unmounted = false;

    const init = async () => {
      const rolesList = await retrieveRoles();
      const permissionList = await retrievePermissions();

      if (!unmounted) {
        setRoles(rolesList);
        setPermissions(permissionList);
      }
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

    const newRoles = roles.map((role: RoleType) => {
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
    });

    setRoles(newRoles);
  };

  const onRoleSave = (roleId: string) => {
    setSaving(true);
    timer.current = window.setTimeout(() => {
      setSaving(false);
    }, 3000);
  };

  const onRoleRemove = (roleId: string) => {
    // const newRoles = roles.filter((role: any) => role.id !== roleId);
    setRemoving(true);
    timer.current = window.setTimeout(() => {
      setRemoving(false);
      // setRoles(newRoles);
    }, 3000);
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
          {roles.length > 0 ? (
            <Grid container item>
              <Grid item xs={12}>
                {roles
                  .filter((role: RoleType) => role.name !== "_default")
                  .map((role: RoleType) => (
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
                      {permissions.map((perm: PermissionType) => (
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
                                          role.permissions.includes(avail.code)
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
                            disabled={removing}
                            onClick={() => onRoleRemove(role.id)}
                          >
                            Remove
                          </Button>
                          {removing && (
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
                            disabled={saving}
                          >
                            Save
                          </Button>
                          {saving && (
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
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Roles;
