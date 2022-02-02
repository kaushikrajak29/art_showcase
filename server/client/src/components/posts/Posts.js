import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './post/Post.js';
import useStyles from './styles';

const Posts = (setEdit) => {
  const posts_store = useSelector((state) => state.posts);
  const classes = useStyles();
  //console.log(posts_store.posts.length);

  //console.log(posts_store);
  return (
    !posts_store.posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts_store.posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Post post={post} setEdit={setEdit}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
