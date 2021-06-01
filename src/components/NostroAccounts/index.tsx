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
import { ProgressBar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data";

const columns = [
  {
    field: "organisation",
    title: "Organisation",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "total_trades",
    title: "Total trades",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "total_commission",
    title: "Total commission",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "nbr_trades",
    title: "Nbr of trades",
    cellStyle: {
      width: "40%",
    },
    sortable: false,
    render: (rowData: any) => {
      const { nbr_trades: nbrTrades } = rowData;

      return (
        <div className="flex-center">
          {nbrTrades.map((ele: number) => {
            return (
              <ProgressBar
                className="w-100 mr-10"
                variant="secondary"
                striped
                now={ele}
                label={`${ele}%`}
              />
            );
          })}
        </div>
      );
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
                Declare new account
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
                Create new vault account
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                columns={columns}
                data={data}
                title="ACCOUNT ACTIVITIES"
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
