/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import {
  Button,
  Container,
  createStyles,
  Divider,
  Fab,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  makeStyles,
  Theme,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import red from "@material-ui/core/colors/red";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    deskContentWrapper: {
      padding: theme.spacing(8),
    },
    textLink: {
      color: red[500],
      cursor: "pointer",
    },
    errorMessage: {
      marginTop: theme.spacing(8),
    },
  })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const Detail = (): React.ReactElement => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3}>
          <Grid container item alignItems="center" xs={12}>
            <Typography variant="h4">DESKS</Typography>
            <Button className={classes.addButton}>
              <Fab
                className="mr-10"
                color="primary"
                aria-label="Add"
                size="small"
              >
                <AddIcon fontSize="small" />
              </Fab>
              Declare new account
            </Button>
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={3}>
              <Grid>
                <TextField
                  className="w-100"
                  value={searchText}
                  onChange={onSearchTextChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <List component="nav" aria-label="desks">
                {data
                  .filter((deskItem) =>
                    deskItem.desk
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((desk) => (
                    <ListItem button>
                      <ListItemText primary={desk.desk} />
                    </ListItem>
                  ))}
              </List>
            </Grid>
            <Grid item xs={9}>
              <Container>
                <Grid container alignItems="center" justify="space-between">
                  <div>
                    <Typography variant="h5">Desk name</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Creation date: 24.02.2021
                    </Typography>
                  </div>
                  <Typography variant="subtitle2" className={classes.textLink}>
                    Delete
                  </Typography>
                </Grid>
                <Divider />
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Detail;
