import React from "react";
import {  Container,
          Grid,
          OutlinedInput,
          InputAdornment,
          InputLabel,
          Input,
          FormControl,
          MenuItem,
          Select,
          Button,
          Icon,
          makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginL10: {
    marginLeft: 10,
  },
}))

const AddOrganizer = (): React.ReactElement => {
  const classes = useStyles();
  return(
    <div className="main-wrapper">
      <Container>
        <Grid container xs={6}>
          <Grid item direction="row" xs={12}>
            <h2>CREAETE NEW ORGANISATION</h2>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Orgainisation name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={150}
              />
          </FormControl>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel id="demo-controlled-open-select-label">IBAN</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container direction="row" xs={12} alignItems="center" style={{padding: 10}}>
            <Icon style={{ fontSize: 35 }}>add_circle</Icon>
            <span className={classes.marginL10}>Add IBAN</span>
          </Grid>
          <Grid item direction="row" xs={12} style={{padding: 10}}>
            <span>Add Organisation logo</span>
            <FormControl fullWidth style={{marginTop: 5}}>
              <OutlinedInput type="file" name="file" id="" />
            </FormControl>
          </Grid>
          <Grid item container direction="row" justify="flex-start" spacing={3} xs={12} style={{padding: 10}}>
            <Grid item xs={6}>
              <FormControl fullWidth style={{marginTop: 5}}>
                <span style={{fontWeight: "bold"}}>Set commission rate</span>
                <Input 
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth style={{marginTop: 5}}>
                <span style={{fontWeight: "bold"}}>Set clearer commission rate</span>
                <Input 
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" xs={12} style={{padding: 10}}>
            <Button variant="contained" color="secondary" >SAVE NEW ORGANISATION</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOrganizer;