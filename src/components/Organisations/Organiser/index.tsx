import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, Select, MenuItem, TextField } from "@material-ui/core"

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


const Organiser = (): React.ReactElement => {
  const classes = useStyle();
  return (
    <div className="main-wrapper">
      <Container>
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
      </Container>
    </div>
  );
};

export default Organiser;