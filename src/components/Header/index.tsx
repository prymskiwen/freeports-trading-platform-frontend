import * as React from "react";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
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
import { Link } from "react-router-dom";

import useAuth from "../../hooks";

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
  },
});
const Header = (): React.ReactElement => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();

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
              <IconButton edge="start" color="inherit" aria-label="settings">
                <Settings fontSize="large" />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="happy">
                <EmojiEmotions fontSize="large" />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="signout">
                <ExitToAppIcon fontSize="large" />
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
