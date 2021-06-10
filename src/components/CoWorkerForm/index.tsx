import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Container,
  IconButton,
  InputLabel,
  Typography,
  Divider,
  FormGroup,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { v4 as uuidv4 } from "uuid";
import profile from "../../assets/images/profile.jpg";

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
}));

interface Role {
  name: string;
  title: string;
  id?: string;
}
const roles: Role[] = [
  { name: "ADMINISTRATIVE_LEAD", title: "Quality manager" },
  { name: "LEGAL_OFFICER", title: "Administrative lead" },
  { name: "QUALITY_MANAGER", title: "Legal offer" },
];

const defaultRole = {
  name: "ADMINISTRATIVE_LEAD",
  id: uuidv4(),
  title: "Quality manager",
};
const CoWorkerForm = (): React.ReactElement => {
  const classes = useStyles();
  const [state, setState] = React.useState<{
    roles: Role[];
    firstName: string;
    lastName: string;
    status: string;
  }>({
    roles: [defaultRole],
    firstName: "",
    lastName: "",
    status: "",
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown | string }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const updateRole = (i: number) => (e: any) => {
    const newRoles = [...state.roles];
    newRoles[i] = e.target.value;
    setState({
      ...state,
      roles: newRoles,
    });
  };

  const addRole = (e: any) => {
    setState({
      ...state,
      roles: [...state.roles, { ...defaultRole, id: uuidv4() }],
    });
  };
  const deleteRole = (i: number) => (e: any) => {
    console.log("Delete role ", i);
    const newRoles = [...state.roles];
    newRoles.splice(i, 1);

    setState({
      ...state,
      roles: newRoles,
    });
  };
  return (
    <Container>
      <Grid container>
        {state.roles.map((role, i) => (
          <Grid
            item
            xs={12}
            className={classes.roleSelectContainer}
            key={role.id}
          >
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="role-select">Role</InputLabel>
              <Select
                native
                value={role}
                onChange={updateRole(i)}
                inputProps={{
                  name: "role",
                  id: "role-select",
                }}
                autoWidth
                className={classes.selectRole}
              >
                <option aria-label="None" value="" />
                {roles.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            {i !== 0 && (
              <IconButton onClick={deleteRole(i)} aria-label="Add role">
                <DeleteForeverIcon />
              </IconButton>
            )}
            {i === state.roles.length - 1 && (
              <IconButton onClick={addRole} aria-label="Add role">
                <AddCircleOutlineIcon />
              </IconButton>
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="status-select">Status</InputLabel>
            <Select
              native
              value={state.status}
              onChange={handleChange}
              inputProps={{
                name: "status",
                id: "status-select",
              }}
            >
              <option aria-label="None" value="" />
              <option value="ACTIVE">Active</option>
              <option value="DISABLED">Disabled</option>
            </Select>
          </FormControl>
        </Grid>

        <Grid container>
          <Grid item xs={8} spacing={3}>
            <Grid item spacing={5}>
              <TextField
                required
                id="first-name"
                label="First Name"
                defaultValue=""
                variant="outlined"
                className={classes.textInput}
              />
              <TextField
                required
                id="last-name"
                label="Last Name"
                defaultValue=""
                variant="outlined"
                className={classes.textInput}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id="first-name"
                label="Required"
                defaultValue=""
                variant="outlined"
                className={classes.textInput}
              />
              <TextField
                required
                id="last-name"
                label="Required"
                defaultValue=""
                variant="outlined"
                className={classes.textInput}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <img style={{ width: 200 }} src={profile} alt="Co-worker" />
          </Grid>
        </Grid>

        <Grid container xs={12} direction="row-reverse">
          <Button className={classes.saveBtn}>Save Changes</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoWorkerForm;
