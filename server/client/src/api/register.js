import axios from 'axios';
//const URL="http://localhost:5000/register"
//const URL1="google.com"
export const registerUser=async (newUser)=>{return await axios.post("server/register",newUser);}
export const getEmail=async(email)=>{return await axios.get(`server/emails/${email}`);}
export const getEmailForgotPassword=async(email)=>{return await axios.get(`server/forgotPassword/${email}`);}
export const resetPassword=async (obj)=>{return await axios.post('server/resetPassword',obj)};