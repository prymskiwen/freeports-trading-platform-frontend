/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./data";

const { manualTrades, tradeHistory } = data;

const tradeColumns = [
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "investors",
    title: "Investors",
    cellStyle: {
      width: "20%",
    },
    render: (rowData: any) => {
      const { investorId } = rowData;

      return <Link to={`/trades/${investorId}`}>{investorId}</Link>;
    },
  },
  {
    field: "status",
    title: "Status",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "send",
    title: "Send",
    cellStyle: {
      width: "20%",
    },
  },
  {
    field: "claimedValue",
    title: "Claimed Value",
    cellStyle: {
      width: "20%",
    },
  },
];

const historyColumns = [
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "investors",
    title: "Investors",
    cellStyle: {
      width: "12%",
    },
    render: (rowData: any) => {
      const { investorId } = rowData;

      return <Link to={`/trades/${investorId}`}>{investorId}</Link>;
    },
  },
  {
    field: "order",
    title: "Order",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "status",
    title: "Status",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "send",
    title: "Send",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "receive",
    title: "Receive",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "broker",
    title: "Broker",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "commission",
    title: "Commission",
    cellStyle: {
      width: "12%",
    },
  },
];

const Trades = (): React.ReactElement => {
  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MaterialTable
              title="MANUAL TRADES"
              columns={tradeColumns}
              data={manualTrades}
              options={{
                search: true,
                pageSize: 5,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title="TRADE HISTORY"
              columns={historyColumns}
              data={tradeHistory}
              options={{
                search: true,
                pageSize: 5,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Trades;
