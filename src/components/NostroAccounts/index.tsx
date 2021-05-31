import React from "react";
import { Button, Container, Grid, Fab, makeStyles } from "@material-ui/core";
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
  },
});
const NostroAccounts = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container>
          <Grid container item justify="flex-end" xs={12}>
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
                Declare new account
              </Button>
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
          <Grid item xs={12} spacing={3}>
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
      </Container>
    </div>
  );
};

export default NostroAccounts;
