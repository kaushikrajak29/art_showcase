import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Grow } from '@material-ui/core';
import { Container } from '@material-ui/core';
import MyPosts from '../posts/MyPosts.js';
import { useDispatch } from 'react-redux';
import {getMyPosts} from '../../actions/post.js'
import { useStyles } from './styles.js';
import MyAppBar from '../appBars/MyAppBar'

export default function AccountMyPosts() {
  const dispatch = useDispatch();
  const classes = useStyles(); 
  useEffect(()=>{
    console.log("render");
    dispatch(getMyPosts());
  });
  return (
    <div className={classes.root}>
      <MyAppBar></MyAppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12}>
              <MyPosts/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}