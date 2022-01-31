import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Grid } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { Grow } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Posts from '../posts/Posts.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/post.js'

//const store = createStore(reducers, compose(applyMiddleware(thunk)));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar() {
  const [ setEdit] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history=useHistory();
  
  const logout=()=>{
    localStorage.clear();
    history.push('/');
  }
  useEffect(()=>{
    console.log("render");
    dispatch(getPosts());
  });
  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>{history.push('/users/user/createPost')}}>createPost</Button>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>{history.push('/users/user/account')}}>MyAcount</Button>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>logout()}>logout</Button>
          </Toolbar>
        </AppBar>

        <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setEdit={setEdit} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}