import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { createPost } from '../../actions/post.js';
import { Container,TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import MyAppBar from '../appBars/MyAppBar.js';
import Alert from '@material-ui/lab/Alert';
import isEmpty from 'is-empty';

const CreatePost = () => {
  const [postData, setPostData] = useState({ title: '', about: '', tags: '', selectedFile: '' });



  const [fileAdded,SetFileAdded]=useState(false);
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
    else if(fileAdded===false){
      setErrorMsg("Please Add One Photo!")
      setErrorOcured(true);
      return false;
    }
    return true;
  }




  const classes = useStyles();
  const history=useHistory();
  const cancel=()=>{
    history.push("/home");
  }

  const dispatch = useDispatch();
  const selectFile=({ base64 })=>{
    SetFileAdded(true);
    setPostData({ ...postData, selectedFile: base64 });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!verifyInput()){
      return;
    }
    console.log(postData);
    history.push("/users/user/posts");
    
    dispatch(createPost(postData));

  };
  return (
    <div className='classes.root1'>
      <MyAppBar></MyAppBar>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5"> Create Post</Typography>
          {errorOccured &&
            <Alert severity="error">{errorMsg}</Alert>
        } 
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
            <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})}/>
            <TextField name="about" variant="outlined" label="about" required fullWidth multiline rows={4} value={postData.about} onChange={(event)=>setPostData({...postData,about:event.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags (ex: #tag1,#tag2)" required fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value})} />
            <div className={classes.fileInput}><FileBase type="file" multiple={false}  onDone={({ base64 }) => selectFile({base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>
            <Button className={classes.buttonSubmit}variant="contained" color="secondary" size="small" fullWidth onClick={(e)=>cancel()}>Cancel</Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default CreatePost;
