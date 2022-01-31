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
import { getEmail, registerUser } from '../../api/register';
import {Link,useHistory} from 'react-router-dom';
import validator from 'validator';
import isEmpty from 'is-empty';
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
  errorBox:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color:'red',
    borderStyle:'solid'
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
  errorMsg:{
      color:'red',
      textAlign:'right',
      marginTop:0,
      marginBottom:0,
  }
}));

export default function Signup(props) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [password2,setPassword2]=useState('');
  const [username,setUsername]=useState('');
  const [wrongPassword,setWrongPassword]=useState(false);
  const [wrongPassword2,setWrongPassword2]=useState(false);
  const [wrongName,setWrongName]=useState(false);
  const [wrongEmail,setWrongEmail]=useState(false);
  const [wrongAccount,setWrongAccount]=useState(false);
  const [loading,setLoading]=useState(false);
  const classes = useStyles();
  const history=useHistory();
  const verifyInput=()=>{
      const flag1=verifyPassword();
      const flag2=verifyPassword2();
      const flag3=verifyName();
      const flag4=verifyEmail();
      if(flag1&&flag2&&flag3&&flag4)return true;
      return false;
  }
  const isEmptyInput=()=>{
    let res=false;
    if(isEmpty(email)===true){
      setWrongEmail(true);
      res=true;
    }
    if(isEmpty(password)===true){
      setWrongPassword(true);
      res=true;
    }
    if(isEmpty(password2)===true){
        setWrongPassword2(true);
        res=true;
    }
    if(isEmpty(username)){
        setWrongName(true);
        res=true;
    }
    return res;
  }
  const verifyName=()=>{
        if(isEmpty(username)){
            setWrongName(true);
            return false;
        }else{
            setWrongName(false);
            return true;
        }
  }
  const verifyPassword2=()=>{
        if(isSamePassword()){
            setWrongPassword2(false);
            return true;
        }else{
            setWrongPassword2(true);
            return false;
        }
  }
  const verifyEmail=()=>{
        if(isEmpty(email)===false&&validator.isEmail(email)===true){
            setWrongEmail(false);
            return true;
        }else{
            setWrongEmail(true);
            return false;
        }
  }
  const verifyPassword=()=>{
      if(!validator.isStrongPassword(password)){
          setWrongPassword(true);
          return false;
      }
      else{
        setWrongPassword(false);
        return true;
      }
  }
  const isSamePassword=()=>{
      return password===password2;
  }
  const isEmailExist= async  ()=>{
      try{
          const result=await getEmail(email);
          if(isEmpty(result.data))return false;
          return true;
      }catch(error){
          console.log(error);
      }
  }
  const register=async (event)=>{
    event.preventDefault();
    if(loading)return;
    if(isEmptyInput())return;
    setWrongAccount(false);
    const isCorrectInput=verifyInput();
    if(isCorrectInput===false)return;
    try{
        setLoading(true);
        const flag=await isEmailExist();
        console.log(flag);
        if(flag===true){
            console.log("account exist");
            setWrongAccount(true);
            setLoading(false); 
            return;
        }
    }catch(error){
        console.log(error);
        return;
    }
    setLoading(true);
    console.log("submit button clicked");
    try{
        registerUser({name:username,email:email,password:password})
        .then(result=>{
            console.log(result);
            if(result.data.registrationSuccess){
                history.push('/login');
                alert("registration sucess");
                setLoading(false);
            }else{
                alert("Something Went Wrong");
            }
        })
        .catch(error=>{
            console.log("kau");
            console.log(error);
        });
    //console.log(data);
    }catch(error){
        console.log(error);
    }
  }
  const password2OnClickHangler=()=>{
      setWrongPassword2(false);
      verifyPassword();
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {wrongAccount&&
            <Alert severity="error">Email is already registered</Alert>
        } 
        <form className={classes.form} noValidate onSubmit={(event)=>register(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="username"
            autoComplete="username"
            autoFocus
            onClick={()=>setWrongName(false)}
            error={wrongName}
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            error={wrongEmail}
            name="email"
            autoComplete="email"
            value={email}
            onClick={()=>setWrongEmail(false)}
            onChange={(event)=>setEmail(event.target.value)}
          />
          <div>
          {wrongEmail &&<h6 className={classes.errorMsg}>{'enter a valid email'}</h6>}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={wrongPassword}
            onClick={()=>setWrongPassword(false)}
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
          />
          <div>
          {wrongPassword &&<h6 className={classes.errorMsg}>{'Use A strong Password'}</h6>}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Re-enter Password"
            type="password"
            value={password2}
            error={wrongPassword2}
            onClick={()=>password2OnClickHangler()}
            onChange={(event)=>setPassword2(event.target.value)}
          />
          {wrongPassword2 &&<h6 className={classes.errorMsg}>{wrongPassword?'':'Password do not match'}</h6>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotPassword">
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link  to="/login">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
    </Container>
  );
}