import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updatePost } from '../../actions/post.js';
import { Container,TextField, Button, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import MyAppBar from '../appBars/MyAppBar.js';
import Alert from '@material-ui/lab/Alert';
import isEmpty from 'is-empty';

const EditPost = () => {
  const id=useSelector((state)=>state.edit.postId);
  const post1=useSelector((state)=>state.posts.myPosts.find((post)=>post._id===id));
  //console.log(post1);
  //const state=useSelector((state)=>state);
  //console.log(state);
  const [postData, setPostData] = useState({ title: post1.title, about: post1.about, tags: post1.tags});
  const classes = useStyles();
  const history=useHistory();
  //setPostData({title: post.title, about: post.about, tags: post.tags, selectedFile: post.selectedFile})
  const dispatch = useDispatch();
  

  const [errorOccured,setErrorOcured]=useState(false);
  const [errorMsg,setErrorMsg]=useState("");
  const verifyInput=()=>{
    if(isEmpty(postData.title)){
      setErrorMsg("Please Add Title!")
      setErrorOcured(true);
      return false;
    }else if(isEmpty(postData.about)){
      setErrorMsg("Please Add Some discription!")
      setErrorOcured(true);
      return false;
    }
    else if(isEmpty(postData.tags)){
      setErrorMsg("Please Add Some Tags!")
      setErrorOcured(true);
      return false;
    }
    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(postData);
    if(!verifyInput()){
      return;
    }
    try{
      post1.title=postData.title;
      post1.about=postData.about;
      post1.tags=postData.tags;
      dispatch(updatePost({id:id,post:post1}));
      history.push("/users/user/posts");
    }catch(error){
      console.log(error);
    }
  };
  const cancel=()=>{
    history.push("/home");
  }
  return (
    <div className='classes.root1'>
      <MyAppBar></MyAppBar>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5"> Edit Post</Typography>
          {errorOccured &&
            <Alert severity="error">{errorMsg}</Alert>
          } 
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
            <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})}/>
            <TextField name="about" variant="outlined" label="about" required fullWidth multiline rows={4} value={postData.about} onChange={(event)=>setPostData({...postData,about:event.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags (ex: #tag1,#tag2)" required fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value})} />
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Save</Button>
            <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" fullWidth onClick={(e)=>cancel()}>Cancel</Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default EditPost;
