/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import Papa from "papaparse";
import { Radios, TextField as MuiTextField } from "mui-rff";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import SearchIcon from "@material-ui/icons/Search";
import red from "@material-ui/core/colors/red";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import { passedTransactionsData } from "../data";

import { useAccountsSlice } from "../slice";
import { useAccountDetailSlice } from "./slice";
import { selectAccounts, selectIsAccountsLoading } from "../slice/selectors";
import {
  selectAccountDetail,
  selectIsDetailLoading,
  selectOperations,
} from "./slice/selectors";
import Loader from "../../../../components/Loader";

interface operationType {
  amount: number;
  date: string;
  label?: string;
  type: string;
}

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
  deleteButton: {
    color: red[500],
  },
  fileInput: {
    display: "none",
  },
});

const validate = (values: any) => {
  const errors: Partial<any> = {};

  if (!values.date) {
    errors.date = "This Field Required";
  }

  if (!values.type) {
    errors.type = "This Field Required";
  }

  if (!values.amount) {
    errors.amount = "This Field Required";
  }

  if (!values.date) {
    errors.date = "This Field Required";
  }

  return errors;
};

const convertDateToDMY = (date: string) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month, year].join(".");
};

const Detail = (): React.ReactElement => {
  const { id: accountId } = useParams<{ id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { actions: accountsActions } = useAccountsSlice();
  const { actions: accountDetailActions } = useAccountDetailSlice();
  const accounts = useSelector(selectAccounts);
  const operations = useSelector(selectOperations);
  const [operation, setOperation] = useState<operationType>({
    amount: 0,
    date: "",
    label: "",
    type: "credit",
  });
  const selectedAccount = useSelector(selectAccountDetail);
  const accountsLoading = useSelector(selectIsAccountsLoading);
  const accountDetailLoading = useSelector(selectIsDetailLoading);
  const [searchText, setSearchText] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [importedFile, setImportedFile] = useState(null);

  const pendingReconciliationColumns = [
    {
      field: "date",
      title: "Date",
      cellStyle: {
        width: "20%",
      },
    },
    {
      field: "label",
      title: "Purpose of the transfer",
      cellStyle: {
        width: "30%",
      },
    },
    {
      title: "Credit",
      cellStyle: {
        width: "15%",
      },
      render: (rowData: any) => {
        const { type, amount } = rowData;

        return type === "credit" ? `${selectedAccount.currency} ${amount}` : "";
      },
    },
    {
      title: "Debit",
      cellStyle: {
        width: "15%",
      },
      render: (rowData: any) => {
        const { type, amount } = rowData;

        return type === "debit" ? `${selectedAccount.currency} ${amount}` : "";
      },
    },
    {
      cellStyle: {
        width: "10%",
      },
      sorting: false,
      render: (rowData: any) => {
        const { id } = rowData;

        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IconButton color="inherit">
                <FlashOnIcon fontSize="small" color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                color="inherit"
                onClick={() => handleOperationDelete(id)}
              >
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      await dispatch(accountsActions.getAccounts());
      await dispatch(accountDetailActions.getAccount(accountId));
      await dispatch(accountDetailActions.getOperations(accountId));
    };
    init();

    return () => {
      mounted = true;
    };
  }, [accountId]);

  const handleBackClick = () => {
    history.push("/nostro-accounts");
  };

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleOperationCreate = async (values: operationType) => {
    await dispatch(
      accountDetailActions.addOperation({ accountId, operation: values })
    );
    setCreateModalOpen(false);
  };

  const handleOperationDelete = async (operationId: string) => {
    await dispatch(
      accountDetailActions.removeOperation({ accountId, operationId })
    );
  };

  const handleImportClick = () => {
    if (fileRef.current !== null) fileRef.current.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      Papa.parse(files[0], {
        skipEmptyLines: true,
        complete: (results: any) => {
          const { data } = results;
          const keys = data[0];
          const values = data.slice(1);
          const objects = values.map((array: Array<any>) => {
            const object: any = {
              label: "",
              date: "",
              type: "credit",
              amount: 0,
            };
            keys.forEach((key: string, i: number) => (object[key] = array[i]));
            return object;
          });
          objects.map(async (object: operationType) => {
            await dispatch(
              accountDetailActions.addOperation({
                accountId,
                operation: object,
              })
            );
          });
        },
      });
    }
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
                      onClick={handleImportClick}
                    >
                      <InsertDriveFileIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                      IMPORT OPERATIONS
                    </Button>
                    <input
                      type="file"
                      ref={fileRef}
                      accept=".csv, .xlsx, .xls"
                      className={classes.fileInput}
                      onChange={handleFileImport}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateModalOpen}
                    >
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
                {accountsLoading && <Loader />}
                {!accountsLoading && (
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
                )}
              </Grid>
              <Grid item xs={10}>
                {accountDetailLoading && <Loader />}
                {!accountDetailLoading && (
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <MaterialTable
                        columns={pendingReconciliationColumns}
                        data={operations.map((opt: any) => ({
                          ...opt,
                          date: convertDateToDMY(opt.date),
                        }))}
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
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={createModalOpen}
          onClose={handleCreateModalClose}
          aria-labelledby="form-dialog-title"
        >
          <Form
            onSubmit={handleOperationCreate}
            mutators={{
              ...arrayMutators,
            }}
            initialValues={operation}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              pristine,
              form: {
                mutators: { push },
              },
              values,
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <DialogTitle id="form-dialog-title">
                  Create Bank Account Operation
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <MuiTextField
                        required
                        type="date"
                        name="date"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MuiTextField
                        required
                        label="Amount"
                        type="number"
                        name="amount"
                        variant="outlined"
                        fieldProps={{
                          parse: (value) => parseInt(value, 10),
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography variant="body1">
                                {selectedAccount.currency}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Radios
                        name="type"
                        formControlProps={{ margin: "none" }}
                        radioGroupProps={{ row: true }}
                        data={[
                          {
                            label: (
                              <Typography variant="body2">Credit</Typography>
                            ),
                            value: "credit",
                          },
                          {
                            label: (
                              <Typography variant="body2">Debit</Typography>
                            ),
                            value: "debit",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MuiTextField
                        label="Purpose of the transfer"
                        type="text"
                        name="label"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                  <Button onClick={handleCreateModalClose} variant="contained">
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    Create
                  </Button>
                </DialogActions>
              </form>
            )}
          />
        </Dialog>
      </Container>
    </div>
  );
};

export default Detail;
