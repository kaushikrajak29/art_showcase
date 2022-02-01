import axios from 'axios';

export const getUserInfo=(obj)=>axios.get(`/server/users/user/userinfo`,{headers:{token:obj.token}});