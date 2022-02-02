import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost} from '../../../actions/post';
import useStyles from './myPostStyle';
import { useHistory } from 'react-router-dom';
import { editPost } from '../../../actions/edit';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Collapse from '@material-ui/core/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

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

const MyPost = ({ post}) => {
  const history=useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const editHandler=()=>{
    dispatch(editPost(post._id));
    history.push(`/posts/${post._id}/edit`);
  }

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deleteHandler=()=>{
    dispatch(deletePost(post._id));
  }
  return (
    <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar style={{backgroundColor:"gray"}} aria-label="recipe">
                {post.email.charAt()}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings" onClick={()=>editHandler()}>
            <MoreVertIcon/>
            </IconButton>
            }
            title={post.email}
            subheader={moment(post.date).fromNow()}
        />
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <CardActions disableSpacing>
            <Button size="small" color="primary" onClick={()=>deleteHandler()}><DeleteIcon fontSize="small" /></Button>
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

export default MyPost;
