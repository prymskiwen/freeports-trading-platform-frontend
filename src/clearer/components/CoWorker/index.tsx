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
import { useCoWorkerSlice } from "./slice";
import { selectCoWorkers } from "./slice/selectors";

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

const CoWorker = (): React.ReactElement => {
  const { actions } = useCoWorkerSlice();
  const classes = useStyles();
  const dispatch = useDispatch();

  const coWorkers = useSelector(selectCoWorkers);

  const [selectedCoWorker, setSelectedCoWorker] = useState(0);

  const handleCoWorkerSelected = (i: number) => {
    dispatch(actions.getCoWorkers());
    setSelectedCoWorker(i);
  };

  useEffect(() => {
    window.store.dispatch(actions.getCoWorkers());
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.sideMenu} xs={12} sm={4} md={4}>
        <Grid container justify="flex-start">
          <Grid sm={8} item className={classes.accordionCoWorker}>
            <Typography variant="h6">CO-WORKER</Typography>
          </Grid>
          <Grid xs={2} item>
            <IconButton color="inherit" aria-label="Add Role">
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
                selected={i === selectedCoWorker}
              >
                <ListItemText primary={`${coWorker.nickname} ${i + 1}`} />
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid item className={classes.main} xs={12} sm={8} lg={9}>
        <Accordion>
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
              <Typography>Kim Wexler (Legal officer)</Typography>
            </div>

            <Button>Disable</Button>
          </AccordionSummary>

          <CoWorkerForm />
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default CoWorker;
