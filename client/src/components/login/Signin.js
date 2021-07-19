import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from 'react'
import {loginUser} from '../../api/login'
import {Link,useHistory} from "react-router-dom";
import { getEmail } from '../../api/register';
import isEmpty from 'is-empty';
import validator from 'validator';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin(props) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [wrongPassword,setWrongPassword]=useState(false);
  const [wrongEmail,setWrongEmail]=useState(false);
  const [wrongEmailMsg,setWrongEmailMsg]=useState('');
  const [wrongPasswordMsg,setWrongPasswordMsg]=useState('');
  const classes = useStyles();
  const history=useHistory();
  const isEmailExist= async  ()=>{
    try{
        const result=await getEmail(email);
        if(isEmpty(result.data))return false;
        return true;
    }catch(error){
        console.log(error);
    }
}
  const isEmptyInput=()=>{
    let res=false;
    if(isEmpty(email)===true){
      setWrongEmail(true);
      setWrongEmailMsg("Enter Email");
      res=true;
    }
    if(isEmpty(password)==true){
      setWrongPassword(true);
      setWrongPasswordMsg("Enter Password");
      res=true;
    }
    return res;
  }
  const verifyEmail=async()=>{
    if(isEmpty(email)===false&&validator.isEmail(email)===true){
        try{
          const flag=await isEmailExist();
          if(flag==false){
            setWrongEmail(true);
            setWrongEmailMsg("Email is not registered");
            return false;
          }
          return true;
        }catch(error){
          console.log(error);
          return false;
        }
    }else{
        setWrongEmail(true);
        setWrongEmailMsg("Enter a valid Email");
        return false;
    }
}
const verifyPassword=()=>{
  if(isEmpty(password)==true){
    setWrongPassword(true);
    setWrongPasswordMsg("Enter Password");
    return false;
  }
  return true;
}
  const verifyInput=async()=>{
    try{
      const flag1=await verifyEmail();
      const flag2=verifyPassword();
      if(flag1&&flag2)return true;
      return false;
    }catch(error){console.log(error);}
  }
  const login=async (event)=>{
    event.preventDefault();
    if(isEmptyInput())return;
    try{
      const correctInput=await verifyInput();
      if(correctInput==false)return;
    }catch(error){console.log(error)}
    console.log("submit button clicked");
    try{
    console.log(email,password);
    loginUser({email:email,password:password})
    .then(result=>{
        console.log(result.data);
        if(result.data.loginSuccess==false){
          setWrongPassword(true);
          setWrongPasswordMsg("Wrong Password");
          return;
        }
        else{
          console.log("Login Success");
          localStorage.setItem("token",result.data.token);
          history.push('/home');
        }
    })
    .catch(error=>{
        console.log("kau");
        console.log(error);
    });
    }catch(error){
        console.log(error);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {wrongEmail&&
            <Alert severity="error">{wrongEmailMsg}</Alert>
        }   
        {wrongPassword&&
            <Alert severity="error">{wrongPasswordMsg}</Alert>
        }
        
        <form className={classes.form} noValidate onSubmit={(event)=>login(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            error={wrongEmail}
            onClick={()=>setWrongEmail(false)}
            autoFocus
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={wrongPassword}
            onClick={()=>setWrongPassword(false)}
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link to="/forgotPassword">
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link  to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          
        </form>
      </Paper>
    </Container>
  );
}