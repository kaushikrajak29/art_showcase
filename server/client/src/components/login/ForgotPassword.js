import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from 'react'
import {Link,} from "react-router-dom";
import { getEmail, getEmailForgotPassword } from '../../api/register';
import isEmpty from 'is-empty';
import validator from 'validator';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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


function ForgotPassword(props) {
  const [email,setEmail]=useState('');
  const [wrongEmail,setWrongEmail]=useState(false);
  const [wrongEmailMsg,setWrongEmailMsg]=useState('');
  const [gotNotification,setGotNotifiaction]=useState(false);
  const [successNotification,setSucessNotification]=useState(false);
  const [notificationMsg,setNotificationMsg]=useState('');
  const [loading,setLoading]=useState(false);
  const classes = useStyles();
  //const history=useHistory();
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
      return res;
    }
    const verifyEmail=async()=>{
      if(isEmpty(email)===false&&validator.isEmail(email)===true){
          try{
            const flag=await isEmailExist();
            if(flag===false){
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
  const verifyInput=async()=>{
    try{
      const flag1=await verifyEmail();
      if(flag1)return true;
      return false;
    }catch(error){console.log(error);}
  }
  const forgotPassword=async (event)=>{
    event.preventDefault();
    //console.log(loading);
    if(loading)return;
    setGotNotifiaction(false);
    if(isEmptyInput())return;
    try{
      setLoading(true);
      const correctInput=await verifyInput();
      if(correctInput===false){setLoading(false);return;}
    }catch(error){console.log(error)}
    setLoading(true);
    getEmailForgotPassword(email)
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
      .catch(error=>console.log(error));
    
  }
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                {gotNotification && (successNotification ?
                    <Alert severity="info">{notificationMsg}</Alert>
                    :<Alert severity="error">{notificationMsg}</Alert>)
                }   
                {wrongEmail&&
                    <Alert severity="error">{wrongEmailMsg}</Alert>
                }   
                <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                <form className={classes.form} noValidate onSubmit={(event)=>forgotPassword(event)}>
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
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Reset Password
                    </Button>
                    
                    <Grid container>
                    <Grid item xs>
                        <Link to="/login">
                        Sign in
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
        </div>
    );
}

export default ForgotPassword;