import React, { useContext, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {likePost,} from '../../../actions/post';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { editPost } from '../../../actions/edit';



const Post = ({ post,setEdit}) => {
  const history=useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  //const usersLiked=post.likes.users;
  //const isliked=usersLiked.filter((user)=>user.email==post.)
  //const [liked,setLiked]=useState(false);
  const editHandler=()=>{
    dispatch(editPost(post._id))
    history.push(`/posts/${post._id}/edit`);
  }
  /*const likeHandler=()=>{

  }*/
  //console.log(post);
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.email}</Typography>
        <Typography variant="body2">{moment(post.date).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={()=>editHandler()} ><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.about}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id))}}><ThumbUpAltIcon fontSize="small" /> Like {post.likes.count} </Button>
        
      </CardActions>
    </Card>
  );
};

export default Post;
