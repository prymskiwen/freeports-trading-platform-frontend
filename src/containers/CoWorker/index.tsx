import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Accordion,
  AccordionSummary,
  IconButton,
  Typography,
  FormGroup,
  FormLabel,
  AccordionDetails,
  Divider,
  AccordionActions,
  Button,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import profile from "../../assets/images/profile.jpg";
import CoWorkerForm from "../../components/CoWorkerForm";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    padding: theme.spacing(3),
    width: 230,
  },
  root: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  listTitle: {
    display: "flex",
  },
  main: {
    padding: theme.spacing(8),
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

const coWorkers = [
  { name: "Co-worker name ", id: 1 },
  { name: "Co-worker name ", id: 2 },
  { name: "Co-worker name ", id: 3 },
  { name: "Co-worker name ", id: 4 },
  { name: "Co-worker name ", id: 5 },
  { name: "Co-worker name ", id: 6 },
  { name: "Co-worker name ", id: 7 },
  { name: "Co-worker name ", id: 8 },
  { name: "Co-worker name ", id: 9 },
];

const CoWorker = (): React.ReactElement => {
  const classes = useStyles();

  const [selectedCoWorker, setSelectedCoWorker] = useState(0);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.sideMenu} sm={4} lg={3}>
        <div className={classes.listTitle}>
          <Typography variant="h5">
            CO-WORKER
            <IconButton color="inherit" aria-label="Add Role">
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Typography>
        </div>

        <div>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" />
              </Grid>
            </Grid>
          </div>
        </div>
        <div />
        <List>
          {coWorkers.map((coWorker, i) => (
            <ListItem
              button
              key={coWorker.id}
              onClick={() => setSelectedCoWorker(i)}
              selected={i === selectedCoWorker}
            >
              <ListItemText primary={`${coWorker.name} ${i + 1}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item className={classes.main} sm={8} lg={9}>
        <Accordion>
          <AccordionSummary
            classes={{ content: classes.accordionSummary }}
            aria-controls="panel1c-content"
          >
            <div className={classes.accordionCoWorker}>
              <ExpandMoreIcon />
              <img
                className={`${classes.accordionProfile} ${classes.paddingSmall}`}
                src={profile}
                alt="Co-worker"
              />
              <Typography>Co worker</Typography>
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

// import React from "react";
// import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: "center",
//       color: theme.palette.text.secondary,
//     },
//   })
// );

// export default function CoWorker() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper className={classes.paper}>xs=12</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
