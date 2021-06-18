/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  createStyles,
  Fab,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    currencyDropdown: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    errorMessage: {
      marginTop: theme.spacing(8),
    },
  })
);

const columns = [
  {
    field: "desk",
    title: "Desks",
    cellStyle: {
      width: "25%",
    },
    render: (rowData: any) => {
      const { desk } = rowData;

      return <Link to="/desks/detail">{desk}</Link>;
    },
  },
  {
    field: "investors",
    title: "Investors",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "coWorkers",
    title: "Co-workers",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "deskValue",
    title: "Desk Value",
    cellStyle: {
      width: "25%",
    },
  },
];

const currencyOptions = [{ name: "U$", value: "usd" }];

const Desks = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
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
          <Grid container item alignItems="center" justify="flex-end" xs={12}>
            <Typography variant="subtitle1">
              Preferred currency display:{" "}
            </Typography>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.currencyDropdown}
            >
              <Select value="usd">
                {currencyOptions.map((opt) => (
                  <MenuItem value={opt.value}>{opt.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                title="DESK ACTIVITIES"
                columns={columns}
                data={data}
                options={{
                  search: true,
                  pageSize: 10,
                  filtering: false,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Desks;
