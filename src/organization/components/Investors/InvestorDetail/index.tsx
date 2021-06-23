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
  IconButton,
  ListItem,
  ListItemText,
  List, Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable, {MTableHeader, MTableToolbar} from 'material-table';

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import VisibilityIcon from '@material-ui/icons/Visibility';

import "bootstrap/dist/css/bootstrap.min.css";

import { trades, currentAccounts, tradingAccounts } from "./data";
import data from "../data";


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
    tableHeader: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  })
);

const tradesColumns = [
  {
    field: "id",
    title: "ID",
    cellStyle: {
      width: "12%",
    },
    render: (rowData: any) => {
      const { id } = rowData;

      return <Link to="/">{id}</Link>;
    },
  },
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "order",
    title: "Order",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "status",
    title: "Status",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "send",
    title: "Send",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "receive",
    title: "Receive",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "broker",
    title: "Broker",
    cellStyle: {
      width: "16%",
    },
  },
  {
    field: "commission",
    title: "Commission",
    cellStyle: {
      width: "12%",
    },
  },
];

const currentAccountsColumns = [
  {
    field: "accountId",
    title: "Account ID",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "cryptocurrency",
    title: "Cryptocurrency",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "balance",
    title: "Balance",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "rules",
    title: "Rules",
    cellStyle: {
      width: "25%",
    },
    render: (rowData: any) => {
      const { id } = rowData;

      return <div>
        <IconButton color="inherit" aria-label="Add Role">
          <VisibilityIcon fontSize="small" color="primary" />
        </IconButton>
        <Button color="primary">Transfer!</Button>
      </div>;
    },
  },
];

const tradingAccountColumns = [
  {
    field: "accountId",
    title: "Account ID",
    cellStyle: {
      width: "30%",
    },
  },
  {
    field: "currency",
    title: "Currency",
    cellStyle: {
      width: "35%",
    },
  },
  {
    field: "balance",
    title: "Balance",
    cellStyle: {
      width: "35%",
    },
  },
];

const InvestorDetail = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className="main-wrapper">
      <Container>
        <IconButton color="inherit" aria-label="Add Role">
          <ArrowBackIosIcon fontSize="large" color="primary" />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <List component="nav" aria-label="desks">
              {data
                .map((investor) => (
                  <ListItem button>
                    <ListItemText primary={investor.investorId} />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid container item xs={10} spacing={4}>
            <Container>
              <Grid container item alignItems="center" justify="space-between">
                <Typography variant="h5">Investor ID</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Creation date: 24.02.2021
                </Typography>
              </Grid>
              <Divider/>
            </Container>
            <Grid item xs={12}>
              <MaterialTable
                title="TRADES"
                columns={tradesColumns}
                data={trades}
                options={{
                  search: false,
                }}
                components={{
                  Toolbar: props => (
                    <Grid container justify="space-between" alignItems="center" spacing={2} className={classes.tableHeader}>
                      <Grid item>
                        <Typography variant="h5">TRADES</Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          INITIATE NEW TRADE
                        </Button>
                      </Grid>
                    </Grid>
                  ),
                }}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={7}>
                <MaterialTable
                  title="CURRENT ACCOUNTS"
                  columns={currentAccountsColumns}
                  data={currentAccounts}
                  options={{
                    search: false,
                    sorting: false,
                    pageSize: 2,
                  }}
                  components={{
                    Toolbar: props => (
                      <Grid container justify="flex-start" alignItems="center" spacing={2} className={classes.tableHeader}>
                        <Grid item>
                          <Typography variant="h5">CURRENT ACCOUNTS</Typography>
                        </Grid>
                        <Grid item>
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
                      </Grid>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <MaterialTable
                  title="TRADING ACCOUNTS"
                  columns={tradingAccountColumns}
                  data={tradingAccounts}
                  options={{
                    search: false,
                    sorting: false,
                    pageSize: 2,
                  }}
                  components={{
                    Toolbar: props => (
                      <Grid container justify="space-between" alignItems="center" spacing={2} className={classes.tableHeader}>
                        <Grid item>
                          <Typography variant="h5">TRADES</Typography>
                        </Grid>
                        <Grid item>
                          <Button color="primary">Fund!</Button>
                          <Button color="primary">Refund!</Button>
                        </Grid>
                      </Grid>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default InvestorDetail;
