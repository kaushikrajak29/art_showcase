import { FETCH_INFO } from "../actionType/userinfo";
import * as api from '../api/userinfo.js';

export const getUserInfo=()=>async(dispatch)=>{
    try{
        console.log("action:getuserinfo");
        const token=localStorage.getItem("token");
        //console.log(token);
        const dataToServer={
          token:token,
        }
        const {data}=await api.getUserInfo(dataToServer);
        //console.log(data);
        dispatch({type:FETCH_INFO,payload:data});
      }catch(error){
        console.log(error.message);
      }
}
