import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  List,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import { trades } from "./data";
import { useInvestorsSlice } from "../slice";
import { useInvestorDetailSlice } from "./slice";
import { selectInvestors, selectIsInvestorsLoading } from "../slice/selectors";
import {
  selectInvestorDetail,
  selectIsDetailLoading,
  selectTradeRequests,
  selectIsTradeRequestsLoading,
} from "./slice/selectors";
import Loader from "../../../../components/Loader";
import { useOrganization } from "../../../../hooks";
import TradeRequest from "../../../../types/TradeRequest";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: theme.palette.primary.main,
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
    tableHeader: {
      paddingLeft: 24,
      paddingRight: 24,
      minHeight: 64,
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

      return (
        <div>
          <IconButton color="inherit" aria-label="Add Role">
            <VisibilityIcon fontSize="small" color="primary" />
          </IconButton>
          <Button color="primary">Transfer!</Button>
        </div>
      );
    },
  },
];

const tradingAccountColumns = [
  {
    field: "account",
    title: "Account ID",
    cellStyle: {
      width: "30%",
    },
    render: (rowData: any) => {
      const { account } = rowData;

      return <Link to="/">{account}</Link>;
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

const convertDateToDMY = (date: string) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month, year].join(".");
};

const InvestorDetail = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { organizationId } = Lockr.get("USER_DATA");
  const { deskId } = useParams<{ deskId: string }>();
  const { investorId } = useParams<{ investorId: string }>();
  const { actions: investorsActions } = useInvestorsSlice();
  const { actions: investorDetailActions } = useInvestorDetailSlice();
  const { getOrganizerdetail } = useOrganization();
  const investors = useSelector(selectInvestors);
  const selectedInvestor = useSelector(selectInvestorDetail);
  const investorsLoading = useSelector(selectIsInvestorsLoading);
  const investorDetailLoading = useSelector(selectIsDetailLoading);
  const tradeRequests = useSelector(selectTradeRequests);
  const tradeRequestsLoading = useSelector(selectIsTradeRequestsLoading);
  const [searchText, setSearchText] = useState("");
  const [tradingAccounts, setTradingAccounts] = useState<
    Array<{ currency: string; iban: string; account: string; balance?: number }>
  >([]);

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      await dispatch(investorsActions.getInvestors());
      await dispatch(
        investorDetailActions.getInvestor({
          organizationId,
          deskId,
          investorId,
        })
      );
      const { clearing: orgAccounts } = await getOrganizerdetail(
        organizationId
      );
      if (!mounted) {
        setTradingAccounts(orgAccounts);
      }
    };
    init();

    return () => {
      mounted = true;
    };
  }, [investorId]);

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconButton color="inherit" aria-label="Add Role">
              <ArrowBackIosIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {investorDetailLoading && <Loader />}
            {!investorDetailLoading && (
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        className="w-100"
                        placeholder="Search..."
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
                    <Grid item xs={12}>
                      {investorsLoading && <Loader />}
                      {!investorsLoading && (
                        <List component="nav" aria-label="investors">
                          {investors
                            .filter((investorItem) =>
                              investorItem.name
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                            )
                            .map((investorItem) => (
                              <ListItem
                                component={Link}
                                button
                                key={investorItem.id}
                                selected={investorItem.id === investorId}
                                to={`/desks/${deskId}/investors/${investorItem.id}`}
                              >
                                <ListItemText primary={investorItem.id} />
                              </ListItem>
                            ))}
                        </List>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        item
                        alignItems="center"
                        justify="space-between"
                      >
                        <Typography variant="h5">
                          {`Investor ID: ${selectedInvestor.id}`}
                        </Typography>
                        {selectedInvestor.createdAt && (
                          <Typography variant="subtitle2" color="textSecondary">
                            {`Creation date: ${convertDateToDMY(
                              selectedInvestor.createdAt
                            )}`}
                          </Typography>
                        )}
                      </Grid>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      {tradeRequestsLoading && <Loader />}
                      {!tradeRequestsLoading && (
                        <MaterialTable
                          title="TRADES"
                          columns={tradesColumns}
                          data={tradeRequests.map((trade: TradeRequest) => ({
                            ...trade,
                          }))}
                          options={{
                            search: false,
                          }}
                          components={{
                            Toolbar: (props) => (
                              <Grid
                                container
                                justify="space-between"
                                alignItems="center"
                                spacing={2}
                                className={classes.tableHeader}
                              >
                                <Grid item>
                                  <Typography variant="h5">TRADES</Typography>
                                </Grid>
                                <Grid item>
                                  <Button variant="contained" color="primary">
                                    <Grid
                                      container
                                      alignItems="center"
                                      spacing={1}
                                    >
                                      <Grid item>
                                        <CompareArrowsIcon />
                                      </Grid>
                                      <Grid item>
                                        <Typography>
                                          INITIATE NEW TRADE
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Button>
                                </Grid>
                              </Grid>
                            ),
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <MaterialTable
                            title={
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                  <Typography variant="h5">
                                    CURRENT ACCOUNTS
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    color="primary"
                                    aria-label="Add"
                                    className={classes.addButton}
                                  >
                                    <AddCircleIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            }
                            columns={currentAccountsColumns}
                            data={
                              selectedInvestor.accounts
                                ? selectedInvestor.accounts.map(
                                    (accItem: any) => ({
                                      ...accItem,
                                    })
                                  )
                                : []
                            }
                            options={{
                              search: false,
                              sorting: false,
                              pageSize: 2,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MaterialTable
                            title="TRADING ACCOUNTS"
                            columns={tradingAccountColumns}
                            data={tradingAccounts.map((accItem: any) => ({
                              ...accItem,
                            }))}
                            options={{
                              search: false,
                              sorting: false,
                              pageSize: 2,
                            }}
                            components={{
                              Toolbar: (props) => (
                                <Grid
                                  container
                                  justify="space-between"
                                  alignItems="center"
                                  className={classes.tableHeader}
                                >
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
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default InvestorDetail;
