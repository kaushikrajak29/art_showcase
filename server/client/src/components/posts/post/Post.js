import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {dislikePost, likePost,} from '../../../actions/post';
import useStyles from './styles';
import { useState } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Collapse from '@material-ui/core/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = ({ post,setEdit}) => {
  const dispatch = useDispatch();
  const email=useSelector((state)=>state.userinfo.info.email);
  const classes = useStyles();
  const usersLiked=post.likes.users;
  const isliked=usersLiked.filter((user)=>user.email===email);
  const [liked,setLiked]=useState(isliked.length?true:false);
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

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
          avatar={
            <Avatar style={{backgroundColor:"gray"}} aria-label="recipe">
              {post.email.charAt()}
            </Avatar>
          }
          title={post.email}
          subheader={moment(post.date).fromNow()}
      />
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>likeHandler()}>
          <FavoriteIcon style={{ color:liked?"red":"gray" }}/>
        </IconButton>
        <div>Like {post.likes.count}</div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography ><b>{post.title}</b></Typography>
          <Typography paragraph><i>{post.about}</i></Typography>
          <Typography><tag>{post.tags}</tag></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
