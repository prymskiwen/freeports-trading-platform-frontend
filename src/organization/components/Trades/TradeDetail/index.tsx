/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import MaterialTable from "material-table";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Tabs,
  Tab,
  Theme,
  Typography,
} from "@material-ui/core";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import grey from "@material-ui/core/colors/grey";
import purple from "@material-ui/core/colors/purple";

import "bootstrap/dist/css/bootstrap.min.css";

import brokers from "./data";

const columns = [
  {
    field: "date",
    title: "Date",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "hours",
    title: "Hours",
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
    field: "sourceValue",
    title: "Source Value",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "targetValue",
    title: "Target Value",
    cellStyle: {
      width: "12%",
    },
  },
  {
    field: "rate",
    title: "rate",
    cellStyle: {
      width: "12%",
    },
  },
];
const data = [
  {
    date: "28.06.2021",
    hours: "16:32",
    broker: "Broker name",
    sourceValue: "CHF 10'890",
    targetValue: "BTC 30",
    rate: "CHF 363/BTC",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    greyCard: {
      backgroundColor: grey[400],
    },
    primaryCard: {
      backgroundColor: purple[400],
    },
    dividerColor: {
      backgroundColor: grey[200],
    },
    tabPanel: {
      width: "100%",
      "& .MuiBox-root": {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    errorMessage: {
      marginTop: theme.spacing(8),
    },
  })
);

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TradeDetail = (): React.ReactElement => {
  const classes = useStyles();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={6}>
          <Grid container item alignItems="center" xs={12}>
            <Typography variant="h6">MANUAL TRADE</Typography>
          </Grid>
          <Grid container item direction="column" xs={12} spacing={2}>
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                (Amount) from (Source account ID) to (Target account ID)
                (Estimated account)
              </Typography>
            </Grid>
            <Grid item>
              <Card className={classes.greyCard}>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        className="h-100"
                      >
                        <Typography variant="subtitle2">Trade value</Typography>
                        <ButtonGroup
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <Button>BTC</Button>
                          <Button disabled>CHF</Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-end"
                        bgcolor="grey.300"
                        borderRadius={16}
                        width={250}
                        height={100}
                        p={2}
                      >
                        <Typography variant="subtitle2">BTC</Typography>
                        <Typography variant="h2">30</Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-end"
                        borderRadius={16}
                        width={250}
                        height={100}
                        p={2}
                      >
                        <Typography variant="subtitle2">BTC</Typography>
                        <Typography variant="h2">1&#39;024</Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-end"
                        borderRadius={16}
                        height={100}
                        p={2}
                      >
                        <Typography variant="subtitle2">
                          remaining of
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-end"
                        borderRadius={16}
                        width={250}
                        height={100}
                        p={2}
                      >
                        <Typography variant="subtitle2">BTC</Typography>
                        <Typography variant="h2">1&#39;400</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider className={classes.dividerColor} />
                <CardActions>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Source account balance
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        style={{ fontWeight: 600 }}
                      >
                        CHF 120&#39;000
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={3}>
              <Card>
                <CardHeader
                  style={{ backgroundColor: purple[400], color: "white" }}
                  title={
                    <Typography variant="h6" align="center">
                      BEST BROKER VALUE
                    </Typography>
                  }
                />
                <Divider className={classes.dividerColor} />
                <CardContent style={{ backgroundColor: grey[300] }}>
                  <Grid container justify="flex-end" xs={12}>
                    <Typography variant="body1">Broker name2</Typography>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-end"
                    xs={12}
                  >
                    <Typography
                      variant="body2"
                      style={{ fontWeight: 600, marginRight: "10px" }}
                    >
                      CHF
                    </Typography>
                    <Typography variant="h5">10&#39;000</Typography>
                  </Grid>
                  <Grid container justify="flex-end" xs={12}>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: 600, marginRight: "10px" }}
                    >
                      Rate
                    </Typography>
                    <Typography variant="body2">CHF 363/BTC</Typography>
                  </Grid>
                </CardContent>
                <Divider className={classes.dividerColor} />
                <CardActions
                  disableSpacing
                  style={{ backgroundColor: grey[300] }}
                >
                  <Button variant="outlined" className="w-100">
                    Click to order!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid container item>
              <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                ALL BROKERS
              </Typography>
            </Grid>
            <Grid container item spacing={2}>
              {brokers.map((broker: any) => (
                <Grid container item xs={2}>
                  <Card className="w-100">
                    <CardContent style={{ backgroundColor: grey[300] }}>
                      <Grid container justify="flex-end" xs={12}>
                        <Typography variant="body1">{broker.name}</Typography>
                      </Grid>
                      <Grid
                        container
                        alignItems="center"
                        justify="flex-end"
                        xs={12}
                      >
                        <Typography
                          variant="body2"
                          style={{ fontWeight: 600, marginRight: "10px" }}
                        >
                          {broker.currency}
                        </Typography>
                        <Typography variant="h5">{broker.price}</Typography>
                      </Grid>
                      <Grid container justify="flex-end" xs={12}>
                        <Typography
                          variant="body2"
                          style={{ fontWeight: 600, marginRight: "10px" }}
                        >
                          Rate
                        </Typography>
                        <Typography variant="body2">{broker.rate}</Typography>
                      </Grid>
                    </CardContent>
                    <Divider className={classes.dividerColor} />
                    <CardActions
                      disableSpacing
                      style={{ backgroundColor: grey[300] }}
                    >
                      <Button variant="outlined" className="w-100">
                        Click to order!
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <AppBar position="static" color="inherit">
              <Tabs
                value={activeTabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="off"
                indicatorColor="primary"
                aria-label="tabs"
              >
                <Tab
                  icon={<HistoryOutlinedIcon />}
                  aria-label="phone"
                  id="scrollable-prevent-tab-0"
                />
                <Tab
                  icon={<ChatBubbleOutlineOutlinedIcon />}
                  aria-label="favorite"
                  id="scrollable-prevent-tab-1"
                />
                <Tab
                  icon={<InsertDriveFileOutlinedIcon />}
                  aria-label="person"
                  id="scrollable-prevent-tab-2"
                />
                <Tab
                  icon={<Typography variant="subtitle2">Brokers</Typography>}
                  aria-label="help"
                  id="scrollable-prevent-tab-3"
                />
              </Tabs>
            </AppBar>
            <TabPanel
              className={classes.tabPanel}
              value={activeTabIndex}
              index={0}
            >
              <MaterialTable
                columns={columns}
                data={data}
                options={{
                  toolbar: false,
                  paging: false,
                }}
              />
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={activeTabIndex}
              index={1}
            >
              Tab Content 2
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={activeTabIndex}
              index={2}
            >
              Tab Content 3
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={activeTabIndex}
              index={3}
            >
              Tab Content 4
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TradeDetail;
