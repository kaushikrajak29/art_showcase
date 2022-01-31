import axios from 'axios';

export const loginUser=async (user)=>{return await axios.post("server/login",user);}
    