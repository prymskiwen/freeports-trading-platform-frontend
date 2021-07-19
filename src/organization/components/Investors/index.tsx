import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { TextField, Select as MuiSelect } from "mui-rff";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./data";
import { useInvestorsSlice } from "./slice";
import { selectInvestors } from "./slice/selectors";
import { useDesksSlice } from "../Desks/slice";
import { selectDesks } from "../Desks/slice/selectors";

interface investorType {
  deskId: string;
  name: string;
}
interface deskType {
  id?: string;
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      // color: theme.palette.primary.main,
      fontWeight: "bold",
      padding: 0,
    },
    currencyDropdown: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    errorMessage: {
      marginTop: theme.spacing(8),
    },
  })
);

const columns = [
  {
    field: "id",
    title: "Investor ID",
    cellStyle: {
      width: "30%",
    },
    render: (rowData: any) => {
      const { id } = rowData;

      return <Link to={`/investors/${id}`}>{id}</Link>;
    },
  },
  {
    field: "accountSummary",
    title: "Account summary",
    cellStyle: {
      width: "30%",
    },
  },
  {
    field: "tradingAccountSummary",
    title: "Trading account summary",
    cellStyle: {
      width: "40%",
    },
  },
];

const currencyOptions = [{ name: "U$", value: "usd" }];

const validate = (values: any) => {
  const errors: Partial<investorType> = {};
  if (!values.deskId) {
    errors.deskId = "This Field Required";
  }
  if (!values.name) {
    errors.name = "This Field Required";
  }
  return errors;
};

const Investors = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions: investorActions } = useInvestorsSlice();
  const investors = useSelector(selectInvestors);
  const { actions: deskActions } = useDesksSlice();
  const desks = useSelector(selectDesks);
  const { organizationId } = Lockr.get("USER_DATA");
  const [investor, setInvestor] = useState<investorType>({
    deskId: "",
    name: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(investorActions.getInvestors());
    dispatch(deskActions.getDesks(organizationId));
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeskCreate = async (values: investorType) => {
    console.log(values);
    await dispatch(
      investorActions.addInvestor({
        organizationId,
        deskId: values.deskId,
        investor: values,
      })
    );
    setDialogOpen(false);
  };

  const handleDeskDelete = (id: string) => {
    // dispatch(actions.removeDesk({ organizationId, deskId: id }));
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid container item alignItems="center" justify="flex-end" xs={12}>
            <Typography variant="subtitle1">
              Preferred currency display:{" "}
            </Typography>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.currencyDropdown}
            >
              <Select value="usd">
                {currencyOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                title={
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography variant="h5">Investors</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.addButton}
                        color="primary"
                        onClick={handleDialogOpen}
                      >
                        <Icon fontSize="large">add_circle</Icon>
                      </IconButton>
                    </Grid>
                  </Grid>
                }
                columns={columns}
                data={investors.map((investorItem: any) => ({
                  ...investorItem,
                }))}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <Form
          onSubmit={handleDeskCreate}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={investor}
          validate={validate}
          render={({
            handleSubmit,
            submitting,
            pristine,
            form: {
              mutators: { push },
            },
            values,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle id="form-dialog-title">
                Create New Investor
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MuiSelect
                      native
                      name="deskId"
                      label="Desk"
                      variant="outlined"
                      fullWidth
                    >
                      <option value="0">Select...</option>
                      {desks.map((deskItem: deskType, index) => (
                        <option key={deskItem.id} value={deskItem.id}>
                          {deskItem.name}
                        </option>
                      ))}
                    </MuiSelect>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      label="Investor name"
                      type="text"
                      name="name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={handleDialogClose} variant="contained">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Create
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </Dialog>
    </div>
  );
};

export default Investors;
