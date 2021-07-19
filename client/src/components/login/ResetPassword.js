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
import {Link,useHistory} from "react-router-dom";
import isEmpty from 'is-empty';
import validator from 'validator';
import Alert from '@material-ui/lab/Alert';
import {resetPassword} from '../../api/register';
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

export default function ResetPassword(props) {
  const [password,setPassword]=useState('');
  const [wrongPassword,setWrongPassword]=useState(false);
  const [wrongPasswordMsg,setWrongPasswordMsg]=useState('');
  const [gotNotification,setGotNotifiaction]=useState(false);
  const [successNotification,setSucessNotification]=useState(false);
  const [notificationMsg,setNotificationMsg]=useState('');
  const [loading,setLoading]=useState(false);
  const classes = useStyles();
  const history=useHistory();
  console.log(history.location.pathname.substring(15));
const verifyPassword=()=>{
  if(isEmpty(password)===true){
    setWrongPassword(true);
    setWrongPasswordMsg("Enter Password");
    return false;
  }
  else if(validator.isStrongPassword(password)===false){
    setWrongPassword(true);
    setWrongPasswordMsg("Enter a Strong Password");
    return false;
  }
  return true;
}
  const login=async (event)=>{
    event.preventDefault();
    if(loading)return;
    const isCorrectInput=verifyPassword();
    if(isCorrectInput===false)return;
    const token=history.location.pathname.substring(15);
    setLoading(true);
    console.log("submit button clicked");
    try{
        resetPassword({token:token,password:password})
        .then(result=>{
            console.log(result);
            if(result.data.success){
                setSucessNotification(true);
            }else{
                setSucessNotification(false);
            }
            setGotNotifiaction(true);
            setNotificationMsg(result.data.msg);
            setLoading(false);
        })
        .catch(error=>{
            //console.log("kau");
            console.log(error);
        });
    //console.log(data);
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
        {gotNotification && (successNotification ?
            <Alert severity="info">{notificationMsg}</Alert>
            :<Alert severity="error">{notificationMsg}</Alert>)
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
            Change Password
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