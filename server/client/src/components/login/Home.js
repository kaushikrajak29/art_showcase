import React from 'react';
import MyAppBar from '../appBars/MyAppBar';
import { makeStyles } from '@material-ui/core';
import { Grow } from '@material-ui/core';
import { Container,Grid } from '@material-ui/core';
import Posts from '../posts/Posts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../actions/userinfo';

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

function Home(props) {
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("render");
        dispatch(getUserInfo());
    });
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <MyAppBar></MyAppBar>
            <Grow in>
                <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12}>
                    <Posts />
                    </Grid>
                </Grid>
                </Container>
            </Grow>
        </div>
    );
}

export default Home;