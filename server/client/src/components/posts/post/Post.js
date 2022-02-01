import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {dislikePost, likePost,} from '../../../actions/post';
import useStyles from './styles';
import { useState } from 'react';



const Post = ({ post,setEdit}) => {
  const dispatch = useDispatch();
  const email=useSelector((state)=>state.userinfo.info.email);
  const classes = useStyles();
  const usersLiked=post.likes.users;
  const isliked=usersLiked.filter((user)=>user.email===email);
  //console.log(usersLiked);
  //console.log(isliked.length);
  const [liked,setLiked]=useState(isliked.length?true:false);
  //console.log(liked);
  const likeHandler=()=>{
    if(liked===false){
      dispatch(likePost(post._id));
      setLiked(true);
    }
    else{
      dispatch(dislikePost(post._id));
      setLiked(false);
    }
  }
  //console.log(post);
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.email}</Typography>
        <Typography variant="body2">{moment(post.date).fromNow()}</Typography>
      </div>
      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.about}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={()=>{likeHandler()}}><ThumbUpAltIcon fontSize="small" /> Like {post.likes.count} </Button>
        
      </CardActions>
    </Card>
  );
};

export default Post;
