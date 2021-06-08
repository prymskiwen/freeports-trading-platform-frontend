import React, { useState } from "react";
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

import { permissionsArray, rolesArray } from "./data";

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
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
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
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
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
const Roles = (): React.ReactElement => {
  const classes = useStyles();
  const [roles, setRoles] = useState(rolesArray);
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef<number>();

  const onPermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    console.log(name, checked);
  };

  const onRoleSave = (roleId: number) => {
    setSuccess(false);
    setSaving(true);
    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setSaving(false);
    }, 3000);
  };

  const onRoleRemove = (roleId: number) => {
    const newRoles = roles.filter((role: any) => role.id !== roleId);
    setSuccess(false);
    setRemoving(true);
    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setRemoving(false);
      setRoles(newRoles);
    }, 3000);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3}>
          <Grid container item alignItems="center" xs={12}>
            <Grid item>
              <Typography variant="h4">Roles</Typography>
            </Grid>
            <Grid item>
              <Link to="/roles/add">
                <IconButton color="inherit" aria-label="settings">
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {roles.map((role) => (
                <Accordion key={role.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                  >
                    <div className={classes.column}>
                      <Typography className={classes.roleName}>
                        {role.roleName}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.roleDescription} />
                    </div>
                  </AccordionSummary>
                  {permissionsArray.map((perm) => (
                    <FormGroup
                      key={perm.value}
                      className={classes.permissionContainer}
                    >
                      <FormLabel
                        component="legend"
                        className={classes.permissionName}
                      >
                        {perm.name}
                      </FormLabel>
                      <AccordionDetails className={classes.permissionDetails}>
                        {perm.availabilities.map((avail) => (
                          <div className={classes.column}>
                            <FormControlLabel
                              className={classes.checkboxLabel}
                              control={
                                <Checkbox
                                  color="primary"
                                  name={avail.value}
                                  onChange={onPermissionChange}
                                />
                              }
                              label={avail.title}
                            />
                          </div>
                        ))}
                      </AccordionDetails>
                    </FormGroup>
                  ))}
                  <Divider />
                  <AccordionActions>
                    <div className={classes.progressButtonWrapper}>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={role.numCoworkers > 0 || removing}
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
        </Grid>
      </Container>
    </div>
  );
};

export default Roles;
