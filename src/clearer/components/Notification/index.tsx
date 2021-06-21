import React, { useState } from "react";
import { Grid, Icon, Button, IconButton, FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { DropdownButton, Dropdown } from "react-bootstrap";

import useAuth from "../../../hooks";


const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    top: 0,
    boxShadow: '0 0 17px 0',
    display: 'flex',
  },
  nofifyBtn: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    
  },
  arrowIcon:{
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 600,
  },
  nofityHead: {
    writingMode: 'vertical-lr',
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  nofityCount: {
    fontSize: 16,
    background: '#f00',
    borderRadius: '50%',
    color: 'white',
    fontWeight: 600,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  alertBar: {
    width: 450,
  }
}))

const Notification =(): React.ReactElement => {
  const classes = useStyle();
  const { isAuthenticated, signOut } = useAuth();

  const [openNotify, setOpenNotify] = useState(false);

  const onHandleOpen = () => {
    if(openNotify){
      setOpenNotify(false);
    }else{
      setOpenNotify(true);
    }
  }

  return(
    <div >
      {isAuthenticated ? (
        <div className={classes.root}>
          <div className={classes.nofifyBtn}>
            <IconButton  className={classes.arrowIcon} onClick={onHandleOpen}>
              {openNotify ? 
              (
                <Icon>chevron_right</Icon>
              ):(
                <Icon>chevron_left</Icon>
              )}
            </IconButton>
            <span className={classes.nofityCount}>2</span>
            <h2 className={classes.nofityHead}>Notification center</h2>  
          </div>  
          {openNotify ? (
            <div className={classes.alertBar}>
              <Grid container item spacing={2} xs={12}>
                <Grid item xs={12}>
                  <Button>&gt;Open as Page</Button>
                  <Button>&gt;History</Button>
                </Grid>
                <Grid item xs={12}>
                  <span>Notification</span>
                  <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                </Grid>
                <Grid item xs={12}>
                  sdfsdf
                </Grid>
              </Grid>
            </div>
          ):(<></>)}
        </div>
      ):(
      <></>
      )}
    </div>
  )
}

export default Notification;