import React from "react";
import {  Container,
          Grid,
} from "@material-ui/core";
import { useParams } from "react-router";

const Editmemeber = (): React.ReactElement => {
  const { id } : any = useParams();
  console.log(id);
  return(
    <div className="main-wrapper">
      <Container >
        <Grid container spacing={3} xs={12}>
          <Grid item xs={6}>
            <h2>Organization name { id }</h2>
          </Grid>
          <Grid item xs={6}>
            <h2>Organization managers</h2>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Editmemeber;