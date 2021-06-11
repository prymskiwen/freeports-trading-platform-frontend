import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

import {makeStyles, useTheme} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));
interface Props { // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}
const Sidebar = (props : Props) : React.ReactElement => {
  const {window} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={
        classes.toolbar
      }/>
      <Divider/>
      <List> {
        ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button
            key={text}>
            <ListItemIcon>{
              index % 2 === 0 ? <InboxIcon/>: <MailIcon/>
            }</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))
      } </List>
      <Divider/>
      <List> {
        ['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button
            key={text}>
            <ListItemIcon>{
              index % 2 === 0 ? <InboxIcon/>: <MailIcon/>
            }</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))
      } </List>
    </div>
  );

  // eslint-disable-next-line max-len
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>

      <nav className={
          classes.drawer
        }
        aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer container={container}
            variant="temporary"
            anchor={
              theme.direction === 'rtl' ? 'right' : 'left'
            }
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={
              {paper: classes.drawerPaper}
            }
            ModalProps={
              {
                keepMounted: true, // Better open performance on mobile.
              }
          }>
            {drawer} </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer classes={
              {paper: classes.drawerPaper}
            }
            variant="permanent"
            open>
            {drawer} </Drawer>
        </Hidden>
      </nav>

    </div>
  );
}

export default Sidebar;
