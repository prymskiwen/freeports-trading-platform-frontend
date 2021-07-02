import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImageUploader from "react-images-upload";

import { useOrganization } from "../../../../hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  selectStyle: {
    width: "250px",
    fontWeight: "initial",
    marginLeft: 15,
  },
  managerName: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
  },
  profileImageContainer: {
    position: "relative",
    width: 150,
    height: 150,
    margin: 20,
    "&:hover, &:focus": {
      "& $profileImage": {
        opacity: 0.5,
      },
    },
  },
  profileImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  profileFileInput: {
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "pointer",
  },
}));

interface managerType {
  id: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
}

const Manager = (props: any): React.ReactElement => {
  const classes = useStyle();
  const showingIcon = false;
  const {
    getOrganizedManager,
    updateOrganizationManager,
    suspendOrganizationManager,
    resumeOrganizationManager,
  } = useOrganization();
  const [organizerId, setOrganizerId] = useState();
  const [organizerStatus, setOrganizerStatus] = useState(true);
  const [manager, setManager] = useState({
    id: "string",
    nickname: "string",
    email: "string",
    phone: "string",
    avatar: "/assets/user4.png",
  });

  useEffect(() => {
    let mounted = false;
    const init = async () => {
      const managerdata = await getOrganizedManager(
        props.organizerid,
        props.managerid
      );

      if (!mounted) {
        setOrganizerId(props.organizerid);
        setManager({
          id: managerdata.id,
          nickname: managerdata.nickname,
          email: managerdata.email,
          phone: managerdata.phone,
          avatar: managerdata.avatar,
        });
        console.log(managerdata.suspended);
        if (managerdata.suspended === "undefined") {
          setOrganizerStatus(true);
        } else {
          setOrganizerStatus(!managerdata.suspended);
        }
      }
    };

    init();
    return () => {
      mounted = true;
    };
  }, []);

  const onHandleName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.nickname = value;
    setManager(newManager);
  };

  const onHandleEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.email = value;
    setManager(newManager);
  };

  const onHandlePhone = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newManager = { ...manager };
    newManager.phone = value;
    setManager(newManager);
  };

  const ondropAvatar = (avataImg: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const newManager = { ...manager };
      newManager.avatar = event.target.result;
      setManager(newManager);
    };
    reader.readAsDataURL(avataImg[0]);
  };

  const updateSubmit = async () => {
    await updateOrganizationManager(
      organizerId,
      manager.id,
      manager.nickname,
      manager.email,
      manager.phone,
      manager.avatar
    )
      .then((data: any) => {
        console.log(data);
        alert("Saved");
      })
      .catch((err: any) => {
        console.log(err);
      });

    if (organizerStatus === true) {
      await resumeOrganizationManager(organizerId, manager.id);
    } else {
      await suspendOrganizationManager(organizerId, manager.id);
    }
  };

  const onHandleStatus = async (event: React.ChangeEvent<any>) => {
    const { value } = event.target;
    console.log(value);
    setOrganizerStatus(value);
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const newManager = { ...manager };
        newManager.avatar = event.target.result;
        setManager(newManager);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Accordion style={{ width: "100%" }}>
      <AccordionSummary
        style={{ flexDirection: "row-reverse" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
              spacing={2}
            >
              <Grid item>
                <Avatar alt="john" src={manager.avatar} />
              </Grid>
              <Grid item>
                <Typography variant="h6">{manager.nickname}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2">Delete permanently</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Grid container spacing={1} xs={12}>
          <Grid item container justify="center" xs={12}>
            {/* <Grid item xs={4}>
              <CardMedia
                style={{ marginTop: 20 }}
                component="img"
                height="140"
                image={manager.avatar}
              />
              <ImageUploader
                withIcon={showingIcon}
                withLabel={showingIcon}
                buttonText="Choose Image"
                buttonStyles={{
                  width: "100%",
                  margin: 0,
                  background: "#fff0",
                  color: "#000",
                }}
                onChange={(ChangeEvent) => ondropAvatar(ChangeEvent)}
                fileContainerStyle={{
                  margin: 0,
                  padding: 0,
                  marginTop: "-25px",
                  background: "#fff9",
                  borderRadius: 0,
                }}
              />
            </Grid>
           */}
            <div className={classes.profileImageContainer}>
              <Avatar
                src={manager.avatar}
                alt="Avatar"
                className={classes.profileImage}
              />
              <input
                type="file"
                name="avatar"
                className={classes.profileFileInput}
                onChange={onAvatarChange}
              />
            </div>
          </Grid>
          <Grid item container direction="row" spacing={2} xs={12}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Nick Name"
                  variant="outlined"
                  value={manager.nickname}
                  onChange={onHandleName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={manager.email}
                  onChange={onHandleEmail}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Phone"
                  variant="outlined"
                  value={manager.phone}
                  onChange={onHandlePhone}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} container alignItems="center" direction="row">
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  value={organizerStatus}
                  onChange={onHandleStatus}
                  label="Status"
                >
                  <MenuItem value="true" selected>
                    Active
                  </MenuItem>
                  <MenuItem value="false">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Grid item container xs={8} justify="flex-end">
          <Button variant="contained" color="primary" onClick={updateSubmit}>
            Save Changes
          </Button>
        </Grid>
      </AccordionActions>
    </Accordion>
  );
};

export default Manager;
