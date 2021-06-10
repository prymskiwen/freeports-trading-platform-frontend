import React from "react";
import { makeStyles } from '@material-ui/core/styles';
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
          TextField,
          Input,
          InputAdornment,
          AccordionSummary,
          AccordionDetails,
          MenuItem,
          Select,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useParams } from "react-router";
import { spawnSync } from "child_process";

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  boldspanMarginL: {
    fontWeight: "bold", marginLeft: 25
  },
  marginL10: {
    marginLeft: 10,
  },
  logotext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectStyle: {
    width: "250px",
    fontSize: 25,
    fontWeight: "initial",
    marginLeft: 15,
  },
  profilBtn: {
    position: 'relative',
    height: 150,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
  },
  profilImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  profiltext: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: "#fff9",
    width: "100%",
    textAlign: "center"
  },
}))

const EditOrganizer = (): React.ReactElement => {
  const { id } : any = useParams();
  const classes = useStyle();
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
                  <span className={classes.boldspanMarginL}>24.02.2021</span>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span className={classes.marginL10}>IBAN: </span>
                  <span className={classes.boldspanMarginL}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span className={classes.marginL10}>IBAN: </span>
                  <span className={classes.boldspanMarginL}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span className={classes.marginL10}>IBAN: </span>
                  <span className={classes.boldspanMarginL}>CH56258462859862588</span>
                </ListItem>
                <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span className={classes.marginL10}>IBAN: </span>
                  <span className={classes.boldspanMarginL}>CH56258462859862588</span>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Icon style={{ fontSize: 35 }}>add_circle</Icon>
                  <span className={classes.marginL10}>Add IBAN</span>
                </ListItem>
              </List>
            </Grid>
            <Grid item spacing={3} xs={12}>
              <Grid xs={6}>
                <span className={classes.logotext}>Logo</span>
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
                    <Grid item xs={6} style={{ padding: 15 }}>
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
                  <Accordion style={{width: "100%"}}>
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
                      <Grid container xs={12}>
                        <Grid item container alignItems="center" direction="row" xs={12}>
                          <span style={{ fontSize: 18 }}>Status</span>
                          <Select className={classes.selectStyle}>
                            <MenuItem value="Active" selected>Active</MenuItem>
                            <MenuItem value="Disactive">Disactive</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item container direction="row" xs={12}>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <TextField label="First Name" variant="outlined" value="John"/>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <TextField label="Name" variant="outlined" value="malkovic"/>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <TextField label="Email" variant="outlined" value="john@gmail.com"/>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <TextField label="Phone" variant="outlined" value="+41 78 255 26 25"/>
                          </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={12}>
                          <Grid item xs={4} style={{ paddingTop: 15 }}>
                            <Button 
                              className={classes.profilBtn}
                            >
                              <span 
                                className={classes.profilImage}
                                style={{
                                  backgroundImage: `url(/assets/user4.png)`
                                }}
                              />
                              <input type="file" hidden />
                              <span className={classes.profiltext}>Change image</span>
                            </Button>
                          </Grid>
                          <Grid item container xs={8} justify="flex-end" alignItems="flex-end" style={{ paddingTop: 15 }}>
                            <Button variant="contained" color="secondary">save changes</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem>
                  <Accordion style={{width: "100%"}}>
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
                  <Accordion style={{width: "100%"}}>
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

export default EditOrganizer;