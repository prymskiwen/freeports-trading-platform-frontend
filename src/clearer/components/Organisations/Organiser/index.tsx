import React, { useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, Select, MenuItem, TextField, FormControl, CardMedia } from "@material-ui/core"
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
  const { getOrganizedManager } = useOrganization();
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
        setManager({
          id: managerdata.id,
          nickname: managerdata.nickname,
          email: managerdata.email,
          phone: managerdata.phone,
          avata: managerdata.avata,
        })
      }
    };

    init()
    return () => {
      mounted = true;
    }
  }, []);

  const ondropAvata = (avataImg: any) => {
    const reader = new FileReader();
    reader.onload = (event: any)=>{
      const newManager = { ...manager };
      newManager.avata = event.target.result;
      setManager(newManager);
    }
    reader.readAsDataURL(avataImg[0]);
  }

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={1} xs={12}>
          <Grid item container alignItems="center" direction="row" xs={12}>
            <span style={{ fontSize: 18 }}>Status</span>
            <Select className={classes.selectStyle}>
              <MenuItem value="Active" selected>Active</MenuItem>
              <MenuItem value="Disactive">Disactive</MenuItem>
            </Select>
          </Grid>
          <Grid item container direction="row" spacing={2} xs={12}>
            <Grid item xs={12} style={{ paddingTop: 15 }}>
              <FormControl fullWidth>
                <TextField label="Nick Name" variant="outlined" value={manager.nickname}/>
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: 15 }}>
              <FormControl fullWidth>
                <TextField label="Email" variant="outlined" value={manager.email}/>
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: 15 }}>
              <FormControl fullWidth>
                <TextField label="Phone" variant="outlined" value="+41 78 255 26 25"/>
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
              <Button variant="contained" color="secondary">save changes</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Organiser;