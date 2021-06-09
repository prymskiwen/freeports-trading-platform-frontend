import {makeStyles, useTheme} from '@material-ui/core/styles';
import React from 'react'
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar

}));

interface MainLayout {
  children: React.ReactNode;
}

const MainLayout = ({children} : MainLayout) : React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={
      classes.root
    }>

      <Sidebar/>
      <main className={
        classes.content
      }>
        <div className={
          classes.toolbar
        }/> {children} </main>
    </div>

  )
};

export default MainLayout
