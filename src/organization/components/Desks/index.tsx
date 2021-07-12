/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import Lockr from "lockr";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { TextField } from "mui-rff";
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
import { useDesksSlice } from "./slice";
import { selectDesks } from "./slice/selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
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
    field: "name",
    title: "Desks",
    cellStyle: {
      width: "25%",
    },
    render: (rowData: any) => {
      const { id, name } = rowData;

      return <Link to={`/desks/${id}`}>{name}</Link>;
    },
  },
  {
    field: "investors",
    title: "Investors",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "coWorkers",
    title: "Co-workers",
    cellStyle: {
      width: "25%",
    },
  },
  {
    field: "deskValue",
    title: "Desk Value",
    cellStyle: {
      width: "25%",
    },
  },
];

const currencyOptions = [{ name: "U$", value: "usd" }];
interface deskType {
  name: string;
  createdAt: string;
}

const validate = (values: any) => {
  const errors: Partial<deskType> = {};
  if (!values.name) {
    errors.name = "This Field Required";
  }
  return errors;
};

const Desks = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { organizationId } = Lockr.get("USER_DATA");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [desk, setDesk] = useState<deskType>({
    name: "",
    createdAt: "",
  });
  const { actions } = useDesksSlice();
  const desks = useSelector(selectDesks);

  useEffect(() => {
    dispatch(actions.getDesks(organizationId));
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeskCreate = async (values: deskType) => {
    await dispatch(actions.addDesk({ organizationId, desk: values }));
    setDialogOpen(false);
  };

  return (
    <div className="main-wrapper">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="flex-end" spacing={2}>
              <Grid item>
                <Typography variant="body2">
                  Preferred currency display:
                </Typography>
              </Grid>
              <Grid item>
                <FormControl
                  size="small"
                  variant="outlined"
                  className={classes.currencyDropdown}
                >
                  <Select value="usd">
                    {currencyOptions.map((opt) => (
                      <MenuItem value={opt.value}>{opt.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  title={
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Typography variant="h5">Desks</Typography>
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
                  data={desks.map((deskItem: any) => ({ ...deskItem }))}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
            initialValues={desk}
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
                  Create New Desk
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Desk name"
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
      </Container>
    </div>
  );
};

export default Desks;
