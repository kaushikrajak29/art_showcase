import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updatePost } from '../../actions/post.js';
import { Container,TextField, Button, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';


const EditPost = () => {
  const id=useSelector((state)=>state.edit.postId);
  const post1=useSelector((state)=>state.posts.posts.find((post)=>post._id===id));
  console.log(post1);
  //const state=useSelector((state)=>state);
  //console.log(state);
  const [postData, setPostData] = useState({ title: post1.title, about: post1.about, tags: post1.tags});
  const classes = useStyles();
  const history=useHistory();
  //setPostData({title: post.title, about: post.about, tags: post.tags, selectedFile: post.selectedFile})
  const clearPost=async(e)=>{
    setPostData({ title: '', about: '', tags: '', });
  };
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    try{
      post1.title=postData.title;
      post1.about=postData.about;
      post1.tags=postData.tags;
      dispatch(updatePost({id:id,post:post1}));
      history.push("/home");
    }catch(error){
      console.log(error);
    }
    
    //

    clearPost();
  };
  const cancel=()=>{
    history.push("/home");
  }
  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
    <Typography component="h1" variant="h5"> Edit Post</Typography>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
        <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})}/>
        <TextField name="about" variant="outlined" label="about" fullWidth multiline rows={4} value={postData.about} onChange={(event)=>setPostData({...postData,about:event.target.value})}/>
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value})} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Save</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" fullWidth onClick={(e)=>clearPost()}>Clear</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" fullWidth onClick={(e)=>cancel()}>Cancel</Button>

      </form>
    </Paper>
    </Container>
  );
};

export default EditPost;
