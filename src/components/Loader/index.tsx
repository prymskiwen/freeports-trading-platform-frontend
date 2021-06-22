import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  loader: {
    padding: theme.spacing(4),
  },
}));
const Loader = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid className={classes.loader} container justify="center">
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
