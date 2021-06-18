import React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import purple from "@material-ui/core/colors/purple";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

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
      const { name: names } = rowData;

      return (
        <Link to="/nostro-accounts/details">{names}</Link>
      );
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
  {
    field: "last_update",
    title: "Last Update",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "reconciliations",
    title: "Reconciliations",
    cellStyle: {
      width: "15%",
    },
  },
];
const useStyles = makeStyles({
  tableButton: {
    color: purple[500],
    fontWeight: "bold",
  },
});
const NostroAccounts = (): React.ReactElement => {
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
      <Container>
        <Grid container spacing={3}>
          <Grid container item justify="flex-end" xs={12}>
            <Grid item>
              <Button
                className={classes.tableButton}
                onClick={handleDeclareAccountModalOpen}
              >
                <Fab
                  className="mr-10"
                  color="primary"
                  aria-label="Add"
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </Fab>
                Declare new External
              </Button>
              <Dialog
                open={declareAccountModalOpen}
                onClose={handleDeclareAccountModalClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Declare New account
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        id="account_name"
                        label="Account name"
                        type="text"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        id="account_number"
                        label="Account number"
                        type="number"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        id="currency"
                        label="Currency"
                        variant="outlined"
                        fullWidth
                        select
                      >
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        id="initial_balance"
                        label="Initial balance"
                        type="number"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleDeclareAccountModalClose}
                    variant="contained"
                    color="primary"
                  >
                    Create account
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item>
              <Button className={classes.tableButton}>
                <Fab
                  className="mr-10"
                  color="primary"
                  aria-label="Add"
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </Fab>
                Create new vault
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                columns={columns}
                data={data}
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
