import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { 
    Container,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    makeStyles,
    CardMedia,
    Button,
    TextField,
 } from "@material-ui/core";
 import ImageUploader from 'react-images-upload';
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

const useStyle = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

const validate = (values: any) => {
  const errors: {
    nickname?: string,
    email?: string,
    password?: string,
    phone?: string,
  } = {};
  if(!values.nickname){
    errors.nickname = "This Field Required";
  }
  if(!values.email){
    errors.email = "This Field Required";
  }
  if(!values.password){
    errors.password = "This Field Required";
  }
  if(!values.phone){
    errors.phone = "This Field Required";
  }

  console.log(values);
  // if(!values.nickname) {
  //   errors = {nickname: "required"};
  // }
  return errors;
}

const AddManager = (): React.ReactElement => {
  const { orgaizationId } : any = useParams();
  const classes = useStyle();
  const showingIcon = false;
  const requirable = true;
  console.log(orgaizationId);
  const history = useHistory();

  const onSubmit = (values: any) => {
    console.log(values);
    alert("mywork");
  }

  
  const [manager, setManager] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    avata: '',
  })

  return (
    <div className="main-wrapper">
      <Container>
        <Form 
          onSubmit={onSubmit}
          initialValues={{
            nickname: "",
            email: "",
            password: "",
            phone: "",
          }}
          mutators={{
            ...arrayMutators,
          }}
          validate={validate}
          render={({ handleSubmit, form: { mutators: {push, pop },}, values, }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container item spacing={1} xs={6}>
                <Grid item xs={12}>
                  <h2>Add New Manager</h2>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <TextField
                      required
                      id="outlined-adornment-amount"
                      label="Manager name"
                      name="nickname"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>  
                <Grid item container spacing={1} xs={12}>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <TextField
                        required
                        id="outlined-adornment-amount"
                        label="Email"
                        name="email"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <TextField
                        required
                        id="outlined-adornment-amount"
                        label="Phone"
                        name="phone"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>   
                <Grid item xs={12}>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <TextField
                      required
                      id="outlined-adornment-amount"
                      label="Password"
                      name="password"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item container spacing={1} xs={12}>
                  <Grid item xs={6}>
                    <CardMedia 
                      style={{ marginTop: 20 }}
                      component="img"
                      height="140"
                      image=""
                    />
                    <ImageUploader
                      withIcon={showingIcon}
                      withLabel={showingIcon}
                      buttonText='Choose Image'
                      buttonStyles={{
                        width: "100%",
                      }}
                      fileContainerStyle={{
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </Grid>
                  <Grid item container xs={6} style={{padding: 15}} direction="row" justify="flex-end" alignItems="flex-end">
                    <Button variant="contained" color="secondary" type="submit">ADD</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Container>
    </div>
  )
}

export default AddManager;