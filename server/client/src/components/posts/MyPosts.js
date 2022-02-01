import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import MyPost from './post/MyPost.js';
import useStyles from './myPostsStyles';

const MyPosts = () => {
  const posts_store = useSelector((state) => state.posts);
  const classes = useStyles();
  //console.log(posts_store.myPosts.length);

  //console.log(posts_store);
  return (
    !posts_store.myPosts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts_store.myPosts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <MyPost post={post}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default MyPosts;
