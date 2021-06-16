import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {  Container,
          Grid,
          IconButton,
          Icon,
          TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";

import { useOrganization } from "../../../hooks";

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

  const { organizers } = useOrganization();
  
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
        field: "disactiveUser",
        title: "Disable Users",
        cellStyle: {
          width: "25%",
        },
      },
    ] as any[]
  })

  const [datas, setDatas] = useState([] as any[]);

  useEffect(() => {
    let unmounted = false;
    const init = async () => {
      const organizerList = await organizers();
      
      if(!unmounted) {
        setDatas(organizerList);
      }
    };
    init()

    return () => {
      unmounted = true;
    }
  }, []);


  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3} xs={12}>
          <Grid
            container
            item
            justify="flex-start"
            alignItems="center"
            spacing={5}
            xs={12}
          >
            <Grid item>
              <h2>Organisation</h2>
            </Grid>
            <Grid item>
              <IconButton onClick={newOrganizer}>
                <Icon style={{ fontSize: 45 }} color="primary">
                  add_circle
                </Icon>
              </IconButton>
            </Grid>
            <Grid item>
              <Icon style={{ fontSize: 35 }}>search</Icon>
              <TextField />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
              columns={state.column}
              data={datas}
              options={{
                toolbar: false,
                search: false,
                pageSize: 10,
              }}
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
