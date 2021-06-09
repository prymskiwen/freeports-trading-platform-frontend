import React from "react";
import {Container} from "@material-ui/core";
import CoWorkerForm from '../CoWorkerForm'


const Dashboard = () : React.ReactElement => {
  return (
    <div className="main-wrapper">
      <Container>

        <CoWorkerForm/>
      </Container>
    </div>
  );
};

export default Dashboard;
