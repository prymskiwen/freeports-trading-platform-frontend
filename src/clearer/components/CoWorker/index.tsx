import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Accordion,
  AccordionSummary,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";

import profile from "../../../assets/images/profile.jpg";
import CoWorkerForm from "../CoWorkerForm";
import User from "../../../types/User";
import { useCoWorkersSlice } from "./slice";
import {
  selectCoWorkers,
  selectIsFormLoading,
  selectIsLoading,
} from "./slice/selectors";
import Loader from "../../../components/Loader";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    padding: theme.spacing(3),
    maxWidth: 320,
  },
  root: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  listTitle: {
    display: "flex",
  },
  main: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  accordionSummary: {
    justifyContent: "space-between",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },

  accordionProfile: {
    height: 36,
  },
  accordionCoWorker: {
    display: "flex",
    alignItems: "center",
  },
  paddingSmall: {
    padding: theme.spacing(1),
  },
}));

const defaultCoWorker = {
  roles: [""],
  nickname: "",
  phone: "",
  email: "",
  avatar: "",
  jobTitle: "",
};
const CoWorker = (): React.ReactElement => {
  const { actions } = useCoWorkersSlice();
  const classes = useStyles();
  const dispatch = useDispatch();

  const coWorkers = useSelector(selectCoWorkers);
  const formLoading = useSelector(selectIsFormLoading);
  const loading = useSelector(selectIsLoading);
  const [selectedCoWorker, setSelectedCoWorker] = useState<User>();
  const [newCoWorker, setNewCoWorker] = useState<User>();

  const handleCoWorkerSelected = (i: number) => {
    // dispatch(actions.getCoWorkers());
    setSelectedCoWorker(coWorkers[i]);
    setNewCoWorker(undefined);
  };

  useEffect(() => {
    window.store.dispatch(actions.getCoWorkers());
  }, []);

  const handleNewCoWorker = (coWorker: User) => {
    console.log("handleNewCoWorker ", coWorker);
    setNewCoWorker(coWorker);
    dispatch(actions.createCoWorker(coWorker));
  };

  const handleCoWorkerUpdate = (coWorker: User) => {
    console.log("handleCoWorkerUpdate ", coWorker);
  };

  const handleAddCoWorker = () => {
    setNewCoWorker(defaultCoWorker);
    setSelectedCoWorker(undefined);
  };
  return (
    <Grid>
      {loading && <Loader />}
      {!loading && (
        <Grid container className={classes.root}>
          <Grid item className={classes.sideMenu} xs={12} sm={4} md={4}>
            <Grid container justify="flex-start">
              <Grid sm={8} item className={classes.accordionCoWorker}>
                <Typography variant="h6">CO-WORKER</Typography>
              </Grid>
              <Grid xs={2} item>
                <IconButton
                  color="inherit"
                  aria-label="Add Role"
                  onClick={handleAddCoWorker}
                >
                  <AddCircleIcon fontSize="large" color="primary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={2} item>
                <SearchIcon />
              </Grid>
              <Grid sm={8} item>
                <TextField id="input-with-icon-grid" />
              </Grid>
            </Grid>

            <List>
              {coWorkers &&
                coWorkers.map((coWorker: User, i: number) => (
                  <ListItem
                    button
                    key={coWorker.id}
                    onClick={() => handleCoWorkerSelected(i)}
                    selected={
                      selectedCoWorker && coWorker.id === selectedCoWorker.id
                    }
                  >
                    <ListItemText primary={`${coWorker.nickname} ${i + 1}`} />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item className={classes.main} xs={12} sm={8} lg={9}>
            {(selectedCoWorker || newCoWorker) && (
              <Accordion expanded>
                <AccordionSummary
                  classes={{ content: classes.accordionSummary }}
                  aria-controls="panel1c-content"
                >
                  <div className={classes.accordionCoWorker}>
                    <ExpandMoreIcon />
                    <img
                      className={`${classes.accordionProfile}
                 ${classes.paddingSmall}`}
                      src={profile}
                      alt="Co-worker"
                    />
                    {selectedCoWorker && (
                      <Typography>{selectedCoWorker.nickname}</Typography>
                    )}
                  </div>

                  <Button>Disable</Button>
                </AccordionSummary>
                {formLoading && <Loader />}
                {!formLoading && selectedCoWorker && (
                  <CoWorkerForm
                    onSubmit={handleCoWorkerUpdate}
                    coWorker={selectedCoWorker}
                  />
                )}
                {!formLoading && newCoWorker && (
                  <CoWorkerForm
                    onSubmit={handleNewCoWorker}
                    coWorker={newCoWorker}
                  />
                )}
              </Accordion>
            )}{" "}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default CoWorker;
