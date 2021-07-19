import axios from 'axios';
const URL="http://localhost:5000/login"
const URL1="google.com"
export const loginUser=async (user)=>{return await axios.post("/login",user);}
    