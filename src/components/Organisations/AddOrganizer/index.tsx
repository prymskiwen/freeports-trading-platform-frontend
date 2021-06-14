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
          List,
          ListItem,
          Button,
          Icon,
          Dialog,
          DialogTitle,
          DialogContent,
          DialogActions,
          makeStyles,
} from "@material-ui/core"
import ImageUploader from 'react-images-upload';
import IBAN from 'iban';
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

interface accountType {
  name: string;
  currency: string;
  type: string;
  iban: string;
  publicAddress: string;
  vaultWalletId: string;
}

const AddOrganizer = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const showingIcon = false;
  const showingLogo = true;
  const fullwidthable = true;
  const mdWidth = "md";
  const [dialogOpen, setDialogOpen] = useState(false);
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
  const [addAccount, setAddAccount] = useState<accountType>({
    name: "",
    currency: "",
    type: "",
    iban: "",
    publicAddress: "",
    vaultWalletId: "",
  })

  const [additionAccounts, setAdditionAccounts] = useState([] as accountType[]);

  const { addOrganization, additionAccount } = useOrganization();

  useEffect(() => {
    console.log("input state is", TextField);
  }, [TextField])

  const onhadlestreet = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.street1 = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlestreettwo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.street2 = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlezip = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.zip = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlecity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.city = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlecountry = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.country = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlename = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.name = value;
    setOrganizerData(neworganizerData);
  }

  const onhadlecommission = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.commission = value;
    setOrganizerData(neworganizerData);
  }

  const onhadleclearer = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const neworganizerData = { ...organizerData } ;
    neworganizerData.clearer = value;
    setOrganizerData(neworganizerData);
  }

  const onPicker = (pic: any) => {
    const reader = new FileReader();
    reader.onload = (e: any)=>{
      const neworganizerData = { ...organizerData } ;
      neworganizerData.logofile = e.target.result;
      setOrganizerData(neworganizerData);
    }
    reader.readAsDataURL(pic[0]);
  }

  const onHandledialog = () => {
    setDialogOpen(true);
  }

  const onhandleAccountname = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.name = value;
    setAddAccount(newAccountData);
  }
  
  const onhandleAccountcurrency = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.currency = value;
    setAddAccount(newAccountData);
  }

  const onhandleAccountType = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.type = value;
    setAddAccount(newAccountData);
  }

  const onhandleAccountIban = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.iban = value;
    setAddAccount(newAccountData);
  }

  const onhandleAccountpkaddress = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.publicAddress = value;
    setAddAccount(newAccountData);
  }

  const onhandleAccountWallet = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = event.target;
    const newAccountData = { ...addAccount }
    newAccountData.vaultWalletId = value;
    setAddAccount(newAccountData);
  }

  const onhandleAdditionAccounts = () => {
    if(addAccount.name === "" || addAccount.iban === "" || !IBAN.isValid(addAccount.iban) || addAccount.currency === ""){
      if(!IBAN.isValid(addAccount.iban)){
        alert('wrong IBAN type');
      }else{
        alert('Please put all fields');
      }
    }else{
      const newAdditionAccounts = additionAccounts;
      newAdditionAccounts.push({
        name: addAccount.name,
        currency: addAccount.currency,
        type: addAccount.type,
        iban: addAccount.iban,
        publicAddress: addAccount.publicAddress,
        vaultWalletId: addAccount.vaultWalletId,
      });
      setAdditionAccounts(newAdditionAccounts);
      setAddAccount({
        name: "",
        currency: "",
        type: "",
        iban: "",
        publicAddress: "",
        vaultWalletId: "",
      });
      setDialogOpen(false);
    }
  }

  const onAdditionfunc = async () => {
    if(organizerData.name === "" || organizerData.commission === "" || organizerData.clearer === "" || organizerData.logofile === ""){
      alert('this is my addition function');
    }else{
      await addOrganization(organizerData.name, organizerData.street1, organizerData.street2, organizerData.zip, organizerData.city, organizerData.country, organizerData.logofile, organizerData.commission, organizerData.clearer)
        .then((data: any) => {
          // additionAccount
          const responseId = data.id;
          if(additionAccounts.length > 0)
          {
            additionAccounts.map(async (accountItem, key) => {
              await additionAccount(responseId, accountItem.name, accountItem.currency, accountItem.type, accountItem.iban, accountItem.publicAddress, accountItem.vaultWalletId)
                .then((res: any) => {
                  if(key === (additionAccounts.length - 1)){
                    history.push('/organisations');
                  }
                }).catch((err: any) => {
                  console.log(err)
                  if(key === (additionAccounts.length - 1)){
                    history.push('/organisations');
                  }
                })
            })
          }else{
            history.push('/organisations');
          }
        }).catch((err: any) => {
          console.log(err);
        })
    }
  }


  return(
    <div className="main-wrapper">
      <Container>
        <Grid container item spacing={1} xs={6}>
          <Grid item xs={12}>
            <h2>CREAETE NEW ORGANISATION</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Orgainisation name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={150}
                onChange={onhadlename}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Street 1</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlestreet}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Street 2</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlestreettwo}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">zip</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={40}
                onChange={onhadlezip}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">City</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={40}
                onChange={onhadlecity}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Country</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onhadlecountry}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <span style={{ fontWeight: "bold" }}>Nostro Accounts</span>
            <List>
              {additionAccounts.map((accountItem) => <ListItem>
                  <Icon color="error" >remove_circle</Icon>
                  <span style={{marginLeft: 10,}}>IBAN: </span>
                  <span style={{fontWeight: "bold", marginLeft: 25}}>{accountItem.iban}</span>
              </ListItem>)}
            </List>
          </Grid>
          <Grid item container direction="row" xs={12} alignItems="center" style={{padding: 10}}>
            <IconButton onClick={onHandledialog}>
              <Icon style={{ fontSize: 35 }}>add_circle</Icon>
            </IconButton>
            <span className={classes.marginL10}>Add Nostro account</span>
          </Grid>
          <Grid item xs={12} style={{padding: 10}}>
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
      {/* account dialog */}
      <Dialog open={dialogOpen} fullWidth={fullwidthable} maxWidth={mdWidth} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Nostro accounts</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={60}
                  onChange={onhandleAccountname}
                />
              </FormControl>
            </Grid>
            <Grid item container direction="row" xs={12}>
              <Grid item xs={6}>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Currency</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    labelWidth={60}
                    onChange={onhandleAccountcurrency}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Type</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    labelWidth={60}
                    onChange={onhandleAccountType}
                  />
                </FormControl>                
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">IBAN</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={60}
                  onChange={onhandleAccountIban}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Public Address</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={60}
                  onChange={onhandleAccountpkaddress}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Wallet Id</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={60}
                  onChange={onhandleAccountWallet}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
            color="secondary"
            onClick={onhandleAdditionAccounts}
            >
              Add Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOrganizer;