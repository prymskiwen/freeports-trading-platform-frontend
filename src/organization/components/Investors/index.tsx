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
  Chip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable, {MTableHeader, MTableToolbar} from 'material-table';

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
    field: "investor_iD",
    title: "Investor ID",
    cellStyle: {
      width: "30%",
    },
    render: (rowData: any) => {
      const { investor_id: investorID } = rowData;

      return <Link to="/investors/detail">{investorID}</Link>;
    },
  },
  {
    field: "account_summary",
    title: "Account summary",
    cellStyle: {
      width: "30%",
    },
  },
  {
    field: "trading_account_summary",
    title: "Trading account summary",
    cellStyle: {
      width: "40%",
    },
  },
];

const currencyOptions = [{ name: "U$", value: "usd" }];

const Investors = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item alignItems="center" xs={12}>
            <Typography variant="h4">Investors</Typography>
            <Button className={classes.addButton}>
              <Fab
                className="mr-10"
                color="primary"
                aria-label="Add"
                size="small"
              >
                <AddIcon fontSize="small" />
              </Fab>
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
                title=""
                columns={columns}
                data={data}
                options={{
                  search: true,
                  pageSize: 10,
                  filtering: false,
                  searchFieldAlignment: "left",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Investors;
