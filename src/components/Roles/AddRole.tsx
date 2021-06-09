import React, { useState } from "react";
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
  Theme,
  Typography,
} from "@material-ui/core";

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
      flexBasis: "33.33%",
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
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const timer = React.useRef<number>();

  const onPermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    console.log(name, checked);
  };

  const onRoleCreate = () => {
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      history.push("/roles");
    }, 3000);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Typography variant="h4">Create new Organisation role</Typography>
          </Grid>
          <Grid container item xs={12}>
            {permissionsArray.map((perm) => (
              <Grid item xs={12}>
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
                  <Grid container>
                    {perm.availabilities.map((avail) => (
                      <Grid item xs={4}>
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
                      </Grid>
                    ))}
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

export default Roles;
