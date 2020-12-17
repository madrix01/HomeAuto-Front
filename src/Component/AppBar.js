import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import TemporaryDrawer from './sideBar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root : {
    height : "7vh",
    background: "black",
    display : "flex",
    flexDirection: "row",
    justifyContent : "space-between",
    alignItems: "center"
  },
  title : {
    width: "100%",
    textAlign: "left"
  }
})

function AppBarStyled(props){
  const classes = useStyles();
    return (
      <div style={{paddingBottom : '10vh'}}>
        <AppBar className={classes.root} >
          <TemporaryDrawer/>
          <Typography variant="h5" className={classes.title}>
              {props.name}
          </Typography>
        </AppBar>
      </div>
    )
}

export default AppBarStyled;