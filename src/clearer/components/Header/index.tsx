import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import {
  ChevronRight,
  EmojiEmotions,
  ExpandMore,
  Home,
  Settings,
} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SendIcon from "@material-ui/icons/Send";
import GroupIcon from "@material-ui/icons/Group";
import useAuth from "../../../hooks";

const navLinks = [
  { title: `Dashboard`, path: `/dashboard`, hasChildren: false },
  { title: `Organisations`, path: `/organisations`, hasChildren: false },
  { title: `Nostro Accounts`, path: `/nostro-accounts`, hasChildren: false },
  { title: `Tracking`, path: `/tracking`, hasChildren: true },
];
const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: `white`,
    "&:hover": {
      textDecoration: `none`,
    },
  },
});
const Header = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const redirect = (path: string) => {
    setAnchorEl(null);
    history.push(path);
  };

  const handleSettingsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container className={classes.navDisplayFlex}>
          <div className={classes.navDisplayFlex}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
            {isAuthenticated ? (
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ title, path, hasChildren }) => (
                  <Link to={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      {hasChildren ? <ExpandMore /> : <ChevronRight />}
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            ) : (
              <></>
            )}
          </div>
          {isAuthenticated ? (
            <div>
              <IconButton
                aria-controls="settings-menu"
                aria-haspopup="true"
                edge="start"
                color="inherit"
                aria-label="settings"
                onClick={handleSettingsMenuClick}
              >
                <Settings fontSize="large" />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleSettingsMenuClose}
                elevation={0}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                getContentAnchorEl={null}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={() => redirect("/roles")}>
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </MenuItem>
                <MenuItem onClick={() => redirect("/co-workers")}>
                  <ListItemIcon>
                    <GroupIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Co-workers" />
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </MenuItem>
              </Menu>
              <IconButton edge="start" color="inherit" aria-label="happy">
                <EmojiEmotions fontSize="large" />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
