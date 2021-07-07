import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import { useAccountsSlice } from "./slice";
import { selectAccounts } from "./slice/selectors";
import { data } from "./data";

const columns = [
  {
    field: "name",
    title: "Name",
    cellStyle: {
      width: "20%",
    },
    sortable: false,
    render: (rowData: any) => {
      const { id, name } = rowData;

      return <Link to={`nostro-accounts/${id}`}>{name}</Link>;
    },
  },
  {
    field: "balance",
    title: "Balance",
    cellStyle: {
      width: "15%",
    },
  },
  {
    field: "type",
    title: "Type",
    cellStyle: {
      width: "15%",
    },
  },
  {
    field: "currency",
    title: "Currency",
    cellStyle: {
      width: "15%",
    },
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: { marginRight: theme.spacing(2) },
  })
);

interface accountType {
  name: string;
  currency: string;
  type: string;
  balance?: number;
  iban: string;
  publicAddress?: string;
  vaultWalletId?: string;
}

const NostroAccounts = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions } = useAccountsSlice();
  const { accounts } = useSelector(selectAccounts);
  const [declareAccountModalOpen, setDeclareAccountModalOpen] =
    React.useState(false);
  const [account, setAccount] = useState<accountType>({
    name: "",
    currency: "CHF",
    type: "fiat",
    balance: 0,
    iban: "",
    publicAddress: "",
    vaultWalletId: "",
  });
  const fiat: Array<string> = ["CHF", "EUR", "USD"];
  const crypto: Array<string> = ["BTC", "ETHER"];

  const handleDeclareAccountModalOpen = () => {
    setDeclareAccountModalOpen(true);
  };

  const handleDeclareAccountModalClose = () => {
    setDeclareAccountModalOpen(false);
  };

  useEffect(() => {
    dispatch(actions.getAccounts());
  }, []);

  const onHandleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newAccount = { ...account };

    newAccount.name = value;
    setAccount(newAccount);
  };

  const onHandleCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newAccount = { ...account };

    if (fiat.includes(value)) {
      newAccount.type = "fiat";
      newAccount.publicAddress = "";
    } else if (crypto.includes(value)) {
      newAccount.type = "crypto";
      newAccount.publicAddress = "";
    }

    newAccount.currency = value;
    setAccount(newAccount);
  };

  const onHandleIBanChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newAccount = { ...account };

    newAccount.iban = value;
    setAccount(newAccount);
  };

  const onHandlePublicAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newAccount = { ...account };

    newAccount.publicAddress = value;
    setAccount(newAccount);
  };

  const onHandleBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newAccount = { ...account };

    newAccount.balance = parseInt(value, 10);
    setAccount(newAccount);
  };

  const handleAccountCreate = () => {
    dispatch(actions.addAccount(account));
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3}>
          <Grid container item justify="flex-end" xs={12}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.actionButton}
                onClick={handleDeclareAccountModalOpen}
              >
                <AddIcon fontSize="small" />
                New Account
              </Button>
              <Dialog
                open={declareAccountModalOpen}
                onClose={handleDeclareAccountModalClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Create New account
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        label="Account name"
                        type="text"
                        variant="outlined"
                        value={account.name}
                        onChange={onHandleNameChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        label="Currency"
                        variant="outlined"
                        value={account.currency}
                        onChange={onHandleCurrencyChange}
                        fullWidth
                        select
                      >
                        <MenuItem value="CHF">CHF</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="BTC">BTC</MenuItem>
                        <MenuItem value="ETHER">ETHER</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {fiat.includes(account.currency) && (
                        <TextField
                          margin="dense"
                          label="Account number"
                          variant="outlined"
                          value={account.iban}
                          onChange={onHandleIBanChange}
                          fullWidth
                        />
                      )}
                      {crypto.includes(account.currency) && (
                        <TextField
                          margin="dense"
                          label="Account number"
                          variant="outlined"
                          value={account.publicAddress}
                          onChange={onHandlePublicAddressChange}
                          fullWidth
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        label="Initial balance"
                        type="number"
                        variant="outlined"
                        value={account.balance}
                        onChange={onHandleBalanceChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                  <Button
                    onClick={handleDeclareAccountModalClose}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAccountCreate}
                    variant="contained"
                    color="primary"
                  >
                    Create account
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                <AddIcon fontSize="small" />
                New Crypto Address
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                columns={columns}
                data={accounts.map((acc: any) => ({ ...acc }))}
                title="NOSTRO ACCOUNTS"
                options={{
                  search: true,
                  pageSize: 10,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NostroAccounts;
