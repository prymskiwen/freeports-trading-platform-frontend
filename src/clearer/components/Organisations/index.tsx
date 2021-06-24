import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {  Container,
          Grid,
          IconButton,
          Icon,
          TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";


import axios from "../../../util/axios";

interface rowfield {
  id: string,
  organisation: string,
  createdate: string,
  activeusers: string,
  disableusers: string,
}

const Organisations = (): React.ReactElement => {
  const history = useHistory();

  const newOrganizer = () => {
    history.push("/organisations/addOrganization");
  };

  const [state, setState] = useState({
    
    column : [
      {
        field: "name",
        title: "Organisation",
        cellStyle: {
          width: "25%",
        },
      },
      {
        field: "createtime",
        title: "Create Date",
        type: 'date',
        dateSetting: { locale: "en-GB" },
        cellStyle: {
          width: "25%",
        },
      },
      {
        field: "acitveUser",
        title: "Active Users",
        cellStyle: {
          width: "25%",
        },
      },
      {
        field: "discativeUser",
        title: "Disable Users",
        cellStyle: {
          width: "25%",
        },
      },
    ] as any[]
  })



  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
              title={<h2>Organisation <IconButton onClick={newOrganizer}>
              <Icon style={{ fontSize: 45 }} color="primary">
                add_circle
              </Icon>
            </IconButton></h2> }
              columns={state.column}
              data={query => new Promise((resolve, reject) =>{
                axios
                  .get(`/organization?page=${(query.page + 1)}&limit=${query.pageSize}&search=${query.search}`)
                  .then((res: any) => {
                    return resolve({
                      data: res.data.content,
                      page: res.data.currentPage - 1,
                      totalCount:res.data.totalRecords,
                    })
                  })
              })}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'edit',
                  onClick: ((event, item:any)=>{
                    console.log(item);
                    if (item && item.name) {
                      console.log(item.name);
                      history.push(`/organisations/editOrganizer/${item.id}`)
                    }
                  }),
                },
              ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Organisations;
