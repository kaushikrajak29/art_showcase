import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { createPost } from '../../actions/post.js';
import { Container,TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
const CreatePost = () => {
  const [postData, setPostData] = useState({ title: '', about: '', tags: '', selectedFile: '' });
  const classes = useStyles();
  const history=useHistory();
  //const post=useSelector((state)=>id?state.posts.find((post)=>post._id===id):null);
  const clearPost=async(e)=>{
    setPostData({ title: '', about: '', tags: '', selectedFile: '' });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    history.push("/home");
    
    dispatch(createPost(postData));

    clearPost();
  };
  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
    <Typography component="h1" variant="h5"> Create Post</Typography>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
        <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})}/>
        <TextField name="about" variant="outlined" label="about" fullWidth multiline rows={4} value={postData.about} onChange={(event)=>setPostData({...postData,about:event.target.value})}/>
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value})} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false}  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={(e)=>clearPost()}>Clear</Button>
      </form>
    </Paper>
    </Container>
  );
};

export default CreatePost;
