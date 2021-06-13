import React, { useEffect, useState } from "react";
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
import ImageUploader from 'react-images-upload';
import { useParams } from "react-router";
import { spawnSync } from "child_process";
import Organiser from "../Organiser";

import { useOrganization } from "../../../hooks";

interface ibantype {
  currency: string;
  iban: string;
  account: string;
}
interface managerType {
  id: string;
  nickname: string;
  email: string;
}
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
  managerName: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15
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
  const showingIcon = false;
  const showingLogo = true;
  const testname = "workinger";

  const { getOrganizerdetail, getManagers } = useOrganization();

  const [LogoImage, setLogoImage] = useState();
  const [Logofile, setLogofile] = useState();
  const [organereddetail, setOrganereddetail] = useState({
    id: "string",
    name: "string",
    commission: "string",
    commissionclear: "string",   
  })
  const [managers, setManagers] = useState([] as managerType[]);
  const [iban, setIban] = useState([] as ibantype[])
  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const detail = await getOrganizerdetail(id);
      const managerList = await getManagers(id);
      
      if(!mounted){
        setOrganereddetail({
          id: detail.id,
          name: detail.name,
          commission: detail.commission,
          commissionclear: detail.commissionclear,
        });
        setIban(detail.clearing);
        setManagers(managerList);
      }
    }
    init();
    return () => {
      mounted = true;
    }
  }, []);

  const ondrop = (pic: any) => {
    console.log(pic);
    const reader = new FileReader();
    reader.onload = (e: any)=>{
      // console.log(e.target.result);
      setLogoImage(e.target.result);
    }
    reader.readAsDataURL(pic[0]);
    setLogofile(pic);
  }
  
  return(
    <div className="main-wrapper">
      <Container >
        <div style={{width:"100%", display: "flex"}}>
          <Grid item xs={6}>
            <Grid container direction="row" >
              <h2> { organereddetail.name }</h2>
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
                {iban.map((ibanItem) => <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span className={classes.marginL10}>IBAN: </span>
                  <span className={classes.boldspanMarginL}>{ibanItem.iban}</span>
                </ListItem>)}
              </List>
              <List>
                <ListItem>
                  <Icon style={{ fontSize: 35 }}>add_circle</Icon>
                  <span className={classes.marginL10}>Add IBAN</span>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <span className={classes.logotext}>Logo</span>
                <Grid item container xs={12} justify="center">
                  <CardMedia 
                    style={{ marginTop: 20 }}
                    component="img"
                    height="140"
                    image={LogoImage}
                  />
                  <ImageUploader
                    withIcon={showingIcon}
                    withLabel={showingIcon}
                    buttonText='Choose Image'
                    onChange={(ChangeEvent) => ondrop(ChangeEvent)}
                    buttonStyles={{
                      width: "100%",
                    }}
                    fileContainerStyle={{
                      margin: 0,
                      padding: 0,
                    }}
                  />
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
                        value={organereddetail.commission}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: 15 }}>
                      <Input 
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        value={organereddetail.commissionclear}
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
            <Grid container item justify="flex-end" xs={12} style={{marginTop: 5}}>
              <Button variant="contained" color="secondary" >SAVE CHANGES</Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row">
              <h2>Organization managers</h2>
            </Grid>
            <Grid item xs={12}>
              <List>
                {managers.map((managerItem) => <ListItem>
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
                          <span className={classes.managerName} >{managerItem.nickname}</span>
                        </Grid>
                        <Grid container justify="flex-end" xs={6}>
                          <span>Delete permanently</span>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Organiser organizerid={id}  managerid={managerItem.id} />
                    </AccordionDetails>
                  </Accordion>
                </ListItem>)}
                
              </List>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default EditOrganizer;