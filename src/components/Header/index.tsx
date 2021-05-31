import * as React from "react";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
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

import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { title: `Dashboard`, path: `/dashboard` },
  { title: `Organisations`, path: `/organisations` },
  { title: `Nostro Accounts`, path: `/nostro-accounts` },
  { title: `Tracking`, path: `/tracking` },
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
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Container className={classes.navDisplayFlex}>
          <div className={classes.navDisplayFlex}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    {location.pathname === path ? (
                      <ExpandMore />
                    ) : (
                      <ChevronRight />
                    )}
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
          <div>
            <IconButton edge="start" color="inherit" aria-label="settings">
              <Settings fontSize="large" />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="happy">
              <EmojiEmotions fontSize="large" />
            </IconButton>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
