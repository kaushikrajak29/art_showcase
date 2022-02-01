import {CREATE,FETCH_ALL,FETCH_ONE,UPDATE,DELETE,LIKE,DISLIKE, FETCH_MY} from '../actionType/post.js';
import * as api from '../api/post.js';

export const createPost = (post) => async (dispatch) => {
    try {
      console.log("action:createpost");
      const token=localStorage.getItem("token");
      const dataToServer={token:token,data:post};
      //console.log(dataToServer);
      const { data } = await api.createPost(dataToServer);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getPosts = () => async (dispatch) => {
    try {
      console.log("action:getposts");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={token:token};
      const { data } = await api.fetchPosts(dataToServer);
      //console.log(data);
      dispatch({ type: FETCH_ALL, payload: data });
      
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getPost=(id)=>async(dispatch)=>{
    try{
      console.got("action:getpost")
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
        id:id
      }
      const {data}=await api.fetchPost(dataToServer);
      //console.log(data);
      dispatch({type:FETCH_ONE,payload:data});
    }catch(error){
      console.log(error.message);
    }
  }
  export const updatePost=(obj)=>async(dispatch)=>{
    try{
      console.log("action:updatepost");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
        id:obj.id,
        post:obj.post
      }
      const {data}=await api.updatePost(dataToServer);
      //console.log(data);
      dispatch({type:UPDATE,payload:data});
    }catch(error){
      console.log(error.message);
    }
  }
  export const likePost=(id)=>async(dispatch)=>{
    try{
      console.log("action:likepost");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
        id:id
      }
      const {data}=await api.likePost(dataToServer);
      //console.log(data);
      dispatch({type:LIKE,payload:data});
    }catch(error){
      console.log(error.message);
    }
  }
  export const dislikePost=(id)=>async(dispatch)=>{
    try{
      console.log("action:dislikepost");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
        id:id
      }
      const {data}=await api.dislikePost(dataToServer);
      //console.log(data);
      dispatch({type:DISLIKE,payload:data});
    }catch(error){
      console.log(error.message);
    }
  }
  export const deletePost=(id)=>async(dispatch)=>{
    try{
      console.log("action:deletepost");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
        id:id
      }
      await api.deletePost(dataToServer);
      //console.log(data);
      dispatch({type:DELETE,payload:{_id:id}});
    }catch(error){
      console.log(error.message);
    }
  }
  export const getMyPosts=()=>async(dispatch)=>{
    try{
      console.log("action:getmyposts");
      const token=localStorage.getItem("token");
      //console.log(token);
      const dataToServer={
        token:token,
      }
      const {data}=await api.getMyPosts(dataToServer);
      //console.log(data);
      dispatch({type:FETCH_MY,payload:data});
    }catch(error){
      console.log(error.message);
    }
  }