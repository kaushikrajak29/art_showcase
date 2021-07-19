import axios from 'axios';
//const URL="http://localhost:5000/register"
//const URL1="google.com"
export const registerUser=async (newUser)=>{return await axios.post("/register",newUser);}
export const getEmail=async(email)=>{return await axios.get(`/emails/${email}`);}
export const getEmailForgotPassword=async(email)=>{return await axios.get(`/forgotPassword/${email}`);}
export const resetPassword=async (obj)=>{return await axios.post('/resetPassword',obj)};