import React from "react";
import {  Container,
          Grid,
          IconButton,
          Icon,
          TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";
import data from "./data"

const column = [
  {
    field: "organisation",
    title: "Organisation",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "create_date",
    title: "Create Date",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "active_users",
    title: "Active Users",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "disable_users",
    title: "Disable Users",
    cellStyle: {
      width: "20%",
    },
  },
]

const Organisations = (): React.ReactElement => {
  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3} xs={12}>
          <Grid container item justify="flex-start" alignItems="center" spacing={5} xs={12}>
            <Grid item>
              <h2>Organisation</h2>
            </Grid>
            <Grid item>
              <IconButton>
                <Icon style={{ fontSize: 45 }} color="primary" >add_circle</Icon>
              </IconButton>
            </Grid>
            <Grid item>
            <Icon style={{ fontSize: 35 }} >search</Icon>
              <TextField />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
              columns={column}
              data={data}
              options={{
                toolbar: false,
                search: false,
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

export default Organisations;
