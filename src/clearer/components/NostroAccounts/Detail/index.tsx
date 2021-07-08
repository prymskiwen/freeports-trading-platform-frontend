import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import {
  data,
  pendingReconciliationsData,
  passedTransactionsData,
} from "../data";

import { useAccountsSlice } from "../slice";
import { useAccountDetailSlice } from "./slice";
import { selectAccounts } from "../slice/selectors";
import { selectAccountDetail } from "./slice/selectors";

const pendingReconciliationColumns = [
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "15%",
    },
  },
  {
    field: "purpose_of_the_transfer",
    title: "Purpose of the transfer",
    cellStyle: {
      width: "35%",
    },
  },
  {
    field: "credit",
    title: "Credit",
    cellStyle: {
      width: "15%",
    },
  },
  {
    field: "debit",
    title: "Debit",
    cellStyle: {
      width: "30%",
    },
  },
  {
    field: "flash",
    title: "",
    cellStyle: {
      width: "5%",
    },
    render: (rowData: any) => {
      return (
        <IconButton color="inherit" aria-label="Add Role">
          <FlashOnIcon fontSize="small" color="primary" />
        </IconButton>
      );
    },
  },
];

const passedTransactionsColumns = [
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "10%",
    },
  },
  {
    field: "client_account",
    title: "Client account",
    cellStyle: {
      width: "15%",
    },
  },
  {
    field: "purpose_of_the_transfer",
    title: "Purpose of the transfer",
    cellStyle: {
      width: "40%",
    },
  },
  {
    field: "credit",
    title: "Credit",
    cellStyle: {
      width: "10%",
    },
  },
  {
    field: "debit",
    title: "Debit",
    cellStyle: {
      width: "10%",
    },
  },
  {
    field: "sender",
    title: "Sender",
    cellStyle: {
      width: "15%",
    },
  },
];

const useStyles = makeStyles({
  importButton: {
    marginRight: "20px",
  },
});

const Detail = (): React.ReactElement => {
  const { id: accountId } = useParams<{ id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { actions: accountsActions } = useAccountsSlice();
  const { actions: accountDetailActions } = useAccountDetailSlice();
  const { accounts } = useSelector(selectAccounts);
  const { selectedAccount } = useSelector(selectAccountDetail);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      await dispatch(accountsActions.getAccounts());
      await dispatch(accountDetailActions.getAccount(accountId));
    };
    init();

    return () => {
      mounted = true;
    };
  }, []);

  const handleBackClick = () => {
    history.push("/nostro-accounts");
  };

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                <IconButton
                  color="inherit"
                  aria-label="Back"
                  onClick={handleBackClick}
                >
                  <ArrowBackIosIcon fontSize="large" color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h4">
                          {selectedAccount.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Typography variant="body2">
                              Account Number:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ fontWeight: "bold" }}
                            >
                              {selectedAccount.type === "fiat"
                                ? selectedAccount.iban
                                : selectedAccount.publicAddress}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton color="inherit" aria-label="Add Role">
                              <EditIcon fontSize="small" color="primary" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Typography variant="body2">Balance:</Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ fontWeight: "bold" }}
                            >
                              {`${selectedAccount.currency} ${selectedAccount.balance}`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.importButton}
                    >
                      <InsertDriveFileIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                      IMPORT OPERATIONS
                    </Button>
                    <Button variant="contained" color="primary">
                      <EditIcon fontSize="small" style={{ color: "white" }} />
                      CREATE OPERATIONS
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <Grid>
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
                <List component="nav" aria-label="accounts">
                  {accounts
                    .filter((accItem) =>
                      accItem.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((account) => (
                      <ListItem
                        component={Link}
                        button
                        key={account.id}
                        selected={account.id === selectedAccount.id}
                        to={`/nostro-accounts/${account.id}`}
                      >
                        <ListItemText primary={`${account.name}`} />
                      </ListItem>
                    ))}
                </List>
              </Grid>
              <Grid item xs={10}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <MaterialTable
                      columns={pendingReconciliationColumns}
                      data={pendingReconciliationsData}
                      title="Pending reconciliations"
                      options={{
                        search: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MaterialTable
                      columns={passedTransactionsColumns}
                      data={passedTransactionsData}
                      title="Passed transactions"
                      options={{
                        search: true,
                        pageSize: 10,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Detail;
