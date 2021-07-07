import React from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FlashOnIcon from "@material-ui/icons/FlashOn";
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

const accounts = [
  { name: "Account name ", id: 1 },
  { name: "Account name ", id: 2 },
  { name: "Account name ", id: 3 },
  { name: "Account name ", id: 4 },
  { name: "Account name ", id: 5 },
  { name: "Account name ", id: 6 },
  { name: "Account name ", id: 7 },
  { name: "Account name ", id: 8 },
];

const Detail = (): React.ReactElement => {
  const classes = useStyles();
  const [declareAccountModalOpen, setDeclareAccountModalOpen] =
    React.useState(false);

  const handleDeclareAccountModalOpen = () => {
    setDeclareAccountModalOpen(true);
  };

  const handleDeclareAccountModalClose = () => {
    setDeclareAccountModalOpen(false);
  };

  return (
    <div className="main-wrapper">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            container
            item
            justify="space-between"
            alignItems="center"
            xs={12}
          >
            <Grid item>
              <IconButton color="inherit" aria-label="Add Role">
                <ArrowBackIosIcon fontSize="large" color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5">ACCOUNT NAME</Typography>
              <Typography>Balance: CHF 1’458’742.45</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Account Number: GHGH788765TR
                <IconButton color="inherit" aria-label="Add Role">
                  <EditIcon fontSize="large" color="primary" />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleDeclareAccountModalClose}
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
              <Button
                onClick={handleDeclareAccountModalClose}
                variant="contained"
                color="primary"
              >
                <EditIcon fontSize="small" style={{ color: "white" }} />
                CREATE OPERATIONS
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={2}>
              <List>
                {accounts.map((account) => (
                  <ListItem
                    button
                    key={account.id}
                    // onClick={() => setSelectedCoWorker(i)}
                    // selected={i === selectedCoWorker}
                  >
                    <ListItemText primary={`${account.name}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xl={10}>
              <MaterialTable
                columns={pendingReconciliationColumns}
                data={pendingReconciliationsData}
                title="Pending reconciliations"
                options={{
                  search: true,
                }}
              />
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
      </Container>
    </div>
  );
};

export default Detail;
