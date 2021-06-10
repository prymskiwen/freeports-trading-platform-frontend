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
          Card,
          Avatar,
          Accordion,
          Input,
          InputAdornment,
          AccordionSummary,
          AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useParams } from "react-router";
import { spawnSync } from "child_process";

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
            <Grid item xs={12}>
              <Card variant="outlined">
                <Grid container xs={12}>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <span style={{ fontWeight: "bold" }}>Commission rates</span>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                    <span style={{ fontWeight: "bold"}}>Clear Commission rates</span>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <Input 
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <Input 
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <span style={{ fontWeight: "bold" }}>Active Users</span>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <span style={{ fontWeight: "bold"}}>Disabled Users</span>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <span style={{ fontWeight: "bold" }}>12</span>
                    </Grid>
                    <Grid item xs={6} style={{ paddingRight: 15 }}>
                      <span style={{ fontWeight: "bold"}}>12</span>
                    </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid container item justify="flex-end" xs={12}>
              <Button variant="contained" color="secondary" >SAVE CHANGES</Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row">
              <h2>Organization managers</h2>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Accordion>
                    <AccordionSummary
                      style={{flexDirection: "row-reverse"}}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container direction="row" alignItems="center" xs={12}>
                        <Grid container direction="row" alignItems="center" justify="flex-start" xs={6}>
                          <Avatar alt="john" src="/assets/user4.png" />
                          <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>John malkovic</span>
                        </Grid>
                        <Grid container justify="flex-end" xs={6}>
                          <span>Delete permanently</span>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                      </span>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem>
                  <Accordion>
                    <AccordionSummary
                      style={{flexDirection: "row-reverse"}}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container direction="row" alignItems="center" xs={12}>
                        <Grid container direction="row" alignItems="center" justify="flex-start" xs={6}>
                          <Avatar alt="john" src="/assets/user5.png" />
                          <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>Mary Olive</span>
                        </Grid>
                        <Grid container justify="flex-end" xs={6}>
                          <span>Delete permanently</span>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                      </span>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem>
                  <Accordion>
                    <AccordionSummary
                      style={{flexDirection: "row-reverse"}}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container direction="row" alignItems="center" xs={12}>
                        <Grid container direction="row" alignItems="center" justify="flex-start" xs={6}>
                          <Avatar alt="john" src="/assets/user11.png" />
                          <span style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>Helen McGal</span>
                        </Grid>
                        <Grid container justify="flex-end" xs={6}>
                          <span>Delete permanently</span>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                      </span>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Editmemeber;