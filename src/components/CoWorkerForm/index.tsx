import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
}));

const CoWorkerForm = (): React.ReactElement => {
  const classes = useStyles();

  const [selectedCoWorker, setSelectedCoWorker] = useState(0);

  return (
    <div>
      <div className={classes.sideMenu}>
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
          {" "}
          {[
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
            "Co-worker name ",
          ].map((text, i) => (
            <ListItem
              button
              key={text}
              onClick={() => setSelectedCoWorker(i)}
              selected={i === selectedCoWorker}
            >
              <ListItemText primary={`${text} ${i + 1}`} />
            </ListItem>
          ))}{" "}
        </List>
      </div>
    </div>
  );
};

export default CoWorkerForm;
