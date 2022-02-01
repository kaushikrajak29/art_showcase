import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getPosts} from '../../actions/post.js'
import { IconButton } from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

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
  logo: {
    maxWidth: 30,
    marginRight: '10px'
  }
}));

export default function MyAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history=useHistory();
  const info=useSelector((state)=>state.userinfo.info)
  //console.log(info);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  


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
            
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>{history.push('/home')}}><h3>Home</h3></Button>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>{history.push('/users/user/createPost')}}><h3>CreatePost</h3></Button>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>{history.push('/users/user/posts')}}><h3>MyPosts</h3></Button>
            <Button color="inherit" style={{textTransform:"none"}} onClick={()=>logout()}><h3>Logout</h3></Button>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Name:<i>{info.name}</i></MenuItem>
                <MenuItem onClick={handleClose}>Email:<i>{info.email}</i></MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
    </div>
  );
}