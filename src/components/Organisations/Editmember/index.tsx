import React from "react";
import {  Container,
          Grid,
          IconButton,
          Button,
          Icon,
          Divider,
          List,
          ListItem,
          CardMedia,
} from "@material-ui/core";
import { useParams } from "react-router";

const Editmemeber = (): React.ReactElement => {
  const { id } : any = useParams();
  console.log(id);
  return(
    <div className="main-wrapper">
      <Container >
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={6}>
            <Grid container direction="row" >
              <h2>Organization name { id }</h2>
              <IconButton>
                <Icon style={{ fontSize: 35 }}>mode</Icon>
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <span>Creation Date:</span> 
                  <span style={{ fontWeight: "bold", marginLeft: 25 }}>24.02.2021</span>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span style={{ marginLeft: 10 }}>IBAN: </span>
                  <span style={{ fontWeight: "bold", marginLeft: 25 }}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span style={{ marginLeft: 10 }}>IBAN: </span>
                  <span style={{ fontWeight: "bold", marginLeft: 25 }}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span style={{ marginLeft: 10 }}>IBAN: </span>
                  <span style={{ fontWeight: "bold", marginLeft: 25 }}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span style={{ marginLeft: 10 }}>IBAN: </span>
                  <span style={{ fontWeight: "bold", marginLeft: 25 }}>CH56258462859862588</span>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Icon style={{ fontSize: 35 }}>add_circle</Icon>
                  <span style={{ marginLeft: 10 }}>Add IBAN</span>
                </ListItem>
              </List>
            </Grid>
            <Grid item spacing={3} xs={12}>
              <Grid xs={6}>
                <span style={{ fontSize: 20, fontWeight: "bold" }}>Logo</span>
                <Grid container xs={12} justify="center">
                  <CardMedia 
                    style={{ marginTop: 20 }}
                    component="img"
                    height="140"
                    image="https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg"
                  />
                  <Button>Change Image</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
          <Grid item xs={6}>
            <h2>Organization managers</h2>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Editmemeber;