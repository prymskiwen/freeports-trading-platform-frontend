import React, { useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  CardMedia,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Accordion } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImageUploader from 'react-images-upload';

import { useOrganization } from "../../../../hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  selectStyle: {
    width: "250px",
    fontSize: 25,
    fontWeight: "initial",
    marginLeft: 15,
  },
  managerName: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15
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

interface managerType {
  id: string;
  nickname: string;
  email: string;
  phone: string;
  avata: string;
}

const Organiser = (props: any): React.ReactElement => {
  const classes = useStyle();
  const showingIcon = false;
  const { getOrganizedManager, updateOrganizationManager, suspendOrganizationManager, resumeOrganizationManager } = useOrganization();
  const [organizerId, setOrganizerId] = useState();
  const [organizerStatus, setOrganizerStatus] = useState(true);
  const [manager, setManager] = useState({
    id: 'string',
    nickname: 'string',
    email: 'string',
    phone: 'string',
    avata: '/assets/user4.png',
  });
  
  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const managerdata = await getOrganizedManager(props.organizerid, props.managerid);
        
      if(!mounted){
        setOrganizerId(props.organizerid);
        setManager({
          id: managerdata.id,
          nickname: managerdata.nickname,
          email: managerdata.email,
          phone: managerdata.phone,
          avata: managerdata.avata,
        });
        console.log(managerdata.suspended);
        if(managerdata.suspended === 'undefined'){
          setOrganizerStatus(true);
        }else{
          setOrganizerStatus(!managerdata.suspended);
        }
      }
    };

    init()
    return () => {
      mounted = true;
    }
  }, []);

  const onHandleName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.nickname = value;
    setManager(newManager);
  }

  const onHandleEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.email = value;
    setManager(newManager);
  }

  const onHandlePhone = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.phone = value;
    setManager(newManager);
  } 

  const ondropAvata = (avataImg: any) => {
    const reader = new FileReader();
    reader.onload = (event: any)=>{
      const newManager = { ...manager };
      newManager.avata = event.target.result;
      setManager(newManager);
    }
    reader.readAsDataURL(avataImg[0]);
  }

  const updateSubmit = async () => {
    await updateOrganizationManager(organizerId, manager.id, manager.nickname, manager.email, manager.phone, manager.avata)
      .then((data: any) => {
        console.log(data);
        alert("Saved");
      }).catch((err: any) => {
        console.log(err);
      })

      if(organizerStatus === true){
        await resumeOrganizationManager(organizerId, manager.id);
      }else{
        await suspendOrganizationManager(organizerId, manager.id);
      }
      
  }

  const onHandleStatus = async (event: React.ChangeEvent<any>) => {
    const { value } = event.target;
    console.log(value);
    setOrganizerStatus(value);
  }

  return (
    <div className="main-wrapper">
      <Container>
        <Accordion style={{width: "100%"}}>
          <AccordionSummary
            style={{flexDirection: "row-reverse"}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container direction="row" alignItems="center" xs={12}>
              <Grid container direction="row" alignItems="center" justify="flex-start" xs={6}>
                <Avatar alt="john" src={manager.avata} />
                <span className={classes.managerName} >{manager.nickname}</span>
              </Grid>
              <Grid container justify="flex-end" xs={6}>
                <span>Delete permanently</span>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} xs={12}>
              <Grid item container alignItems="center" direction="row" xs={12}>
                <span style={{ fontSize: 18 }}>Status</span>
                <Select className={classes.selectStyle} value={organizerStatus} onChange={onHandleStatus}>
                  <MenuItem value="true" selected>Active</MenuItem>
                  <MenuItem value="false">Disactive</MenuItem>
                </Select>
              </Grid>
              <Grid item container direction="row" spacing={2} xs={12}>
                <Grid item xs={12} style={{ paddingTop: 15 }}>
                  <FormControl fullWidth>
                    <TextField
                      label="Nick Name"
                      variant="outlined"
                      value={manager.nickname}
                      onChange={onHandleName} 
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} style={{ paddingTop: 15 }}>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={manager.email}
                      onChange={onHandleEmail}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} style={{ paddingTop: 15 }}>
                  <FormControl fullWidth>
                    <TextField
                      label="Phone"
                      variant="outlined"
                      value={manager.phone}
                      onChange={onHandlePhone}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container direction="row" xs={12}>
                <Grid item xs={4} style={{ paddingTop: 15 }}>
                  <CardMedia 
                    style={{ marginTop: 20 }}
                    component="img"
                    height="140"
                    image={manager.avata}
                  />
                  <ImageUploader
                    withIcon={showingIcon}
                    withLabel={showingIcon}
                    buttonText='Choose Image'
                    buttonStyles={{
                      width: "100%",
                      margin: 0,
                      background: "#fff0",
                      color: "#000",
                    }}
                    onChange={(ChangeEvent) => ondropAvata(ChangeEvent)}
                    fileContainerStyle={{
                      margin: 0,
                      padding: 0,
                      marginTop: "-25px",
                      background: "#fff9",
                      borderRadius: 0,
                    }}
                  />
                </Grid>
                <Grid item container xs={8} justify="flex-end" alignItems="flex-end" style={{ paddingTop: 15 }}>
                  <Button variant="contained" color="secondary" onClick={updateSubmit}>save changes</Button>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
};

export default Organiser;