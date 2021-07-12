import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  createStyles,
  FormControl,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
  Chip,
} from "@material-ui/core";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      // color: theme.palette.primary.main,
      fontWeight: "bold",
      padding: 0,
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
    field: "investorId",
    title: "Investor ID",
    cellStyle: {
      width: "30%",
    },
    render: (rowData: any) => {
      const { investorId } = rowData;

      return <Link to={`/investors/${investorId}`}>{investorId}</Link>;
    },
  },
  {
    field: "accountSummary",
    title: "Account summary",
    cellStyle: {
      width: "30%",
    },
  },
  {
    field: "tradingAccountSummary",
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
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                title={
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography variant="h5">Investors</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton className={classes.addButton} color="primary">
                        <Icon fontSize="large">add_circle</Icon>
                      </IconButton>
                    </Grid>
                  </Grid>
                }
                columns={columns}
                data={data}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Investors;
