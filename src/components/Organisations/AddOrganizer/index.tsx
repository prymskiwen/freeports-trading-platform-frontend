import React, { useEffect, useState } from "react";
import {  Container,
          Grid,
          OutlinedInput,
          InputAdornment,
          IconButton,
          InputLabel,
          Input,
          TextField,
          FormControl,
          MenuItem,
          Select,
          Button,
          Icon,
          makeStyles,
} from "@material-ui/core"
import ImageUploader from 'react-images-upload';
import { useHistory } from "react-router";
import { useOrganization } from "../../../hooks";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginL10: {
    marginLeft: 10,
  },
}))
interface additionOrganizerType {
  name: string;
  street1: string;
  street2: string;
  zip: string;
  city: string;
  country: string;
  commission: string;
  clearer: string;
  logofile: string;
}

const AddOrganizer = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const showingIcon = false;
  const showingLogo = true;
  const [organizerData, setOrganizerData] = useState<additionOrganizerType>({
    name: "",
    street1: "",
    street2: "",
    zip: "",
    city: "",
    country: "",
    commission: "",
    clearer: "",
    logofile: "",
  });

  const { addOrganization } = useOrganization();

  useEffect(() => {
    console.log("input state is", TextField);
  }, [TextField])

  const onhadlestreet = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.street1 = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlestreettwo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.street2 = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlezip = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.zip = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlecity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.city = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlecountry = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.country = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlename = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.name = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadlecommission = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.commission = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }

  const onhadleclearer = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.clearer = value;
    setOrganizerData(neworganizerData);
    console.log(organizerData);
  }
  const onPicker = (pic: any) => {
    console.log(pic);
    const reader = new FileReader();
    reader.onload = (e: any)=>{
      // console.log(e.target.result);
      const neworganizerData = { ...organizerData } ;
      neworganizerData.logofile = e.target.result;
      setOrganizerData(neworganizerData);
      console.log(organizerData);
    }
    reader.readAsDataURL(pic[0]);
  }
  const onAdditionfunc = async () => {
    if(organizerData.name === "" || organizerData.commission === "" || organizerData.clearer === "" || organizerData.logofile === ""){
      alert('this is my addition function');
    }else{
      await addOrganization(organizerData.name, organizerData.street1, organizerData.street2, organizerData.zip, organizerData.city, organizerData.country, organizerData.logofile, organizerData.commission, organizerData.clearer)
        .then((data: any) => {
          console.log(data);
          history.push('/organisations');
          // if(data !== "") {
          // }
        }).catch((err: any) => {
          console.log(err);
        })
    }
  }


  return(
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={1} xs={6}>
          <Grid item direction="row" xs={12}>
            <h2>CREAETE NEW ORGANISATION</h2>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Orgainisation name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={150}
                onChange={onhadlename}
              />
            </FormControl>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Street 1</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlestreet}
              />
            </FormControl>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Street 2</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlestreettwo}
              />
            </FormControl>
          </Grid>
          <Grid item direction="row" xs={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">zip</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={40}
                onChange={onhadlezip}
              />
            </FormControl>
          </Grid>
          <Grid item direction="row" xs={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">City</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={40}
                onChange={onhadlecity}
              />
            </FormControl>
          </Grid>
          <Grid item direction="row" xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Country</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlecountry}
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
            <IconButton>
              <Icon style={{ fontSize: 35 }}>add_circle</Icon>
            </IconButton>
            <span className={classes.marginL10}>Add IBAN</span>
          </Grid>
          <Grid item direction="row" xs={12} style={{padding: 10}}>
            <span style={{fontWeight: "bold"}}>Add Organisation logo</span>
            <FormControl fullWidth style={{marginTop: 5}}>
              <ImageUploader
                withIcon={showingIcon}
                withLabel={showingIcon}
                buttonText='Choose Image'
                onChange={(ChangeEvent) => onPicker(ChangeEvent)}
                buttonStyles={{
                  width: "100%",
                  padding: 10,
                  fontSize: 20,
                }}
                fileContainerStyle={{
                  margin: 0,
                  padding: 0,
                }}
                withPreview={showingLogo}
                singleImage={showingLogo}
              />
            </FormControl>
          </Grid>
          <Grid item container direction="row" justify="flex-start" spacing={3} xs={12} style={{padding: 10}}>
            <Grid item xs={6}>
              <FormControl fullWidth style={{marginTop: 5}}>
                <span style={{fontWeight: "bold"}}>Set commission rate</span>
                <Input 
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  onChange={onhadlecommission}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth style={{marginTop: 5}}>
                <span style={{fontWeight: "bold"}}>Set clearer commission rate</span>
                <Input 
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  onChange={onhadleclearer}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" xs={12} style={{padding: 10}}>
            <Button 
              variant="contained"
              color="secondary"
              onClick={onAdditionfunc}
            >
              SAVE NEW ORGANISATION
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOrganizer;