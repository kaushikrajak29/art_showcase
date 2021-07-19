import React, { useState } from 'react';

import { Container,TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';

const CreatePost = () => {
  const [postData, setPostData] = useState({ title: '', about: '', tags: '', selectedFile: '' });
  const classes = useStyles();

  const handleSubmit = async (e) => {

  };

  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper}>
    <Typography component="h1" variant="h5"> Create Post</Typography>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name="title" variant="outlined" label="Title" required fullWidth  />
        <TextField name="about" variant="outlined" label="about" fullWidth multiline rows={4}  />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth   />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
      </form>
    </Paper>
    </Container>
  );
};

export default CreatePost;
