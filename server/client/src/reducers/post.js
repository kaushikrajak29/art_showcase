import {CREATE,FETCH_ALL,FETCH_ONE,UPDATE,DELETE,LIKE,DISLIKE, FETCH_MY} from '../actionType/post.js';
import { EmptyPost } from '../states/post.js';

export const posts=(state = EmptyPost, action) => {
  switch (action.type) {
    case CREATE:
      console.log("in create reducer");
      console.log(action.payload);
      return {posts:[...state.posts,action.payload],myPosts:state.myPosts};
    case FETCH_ALL:
      console.log("in reducer ");
      console.log(action.payload)
      return {posts:action.payload,myPosts:state.myPosts}
    case FETCH_ONE:
      console.log("in Fetchone reducer");
      return state;
    case DELETE:
      console.log("in delete reducer");
      return {posts:state.posts.filter((post)=>post._id!==action.payload._id),myPosts:state.myPosts.filter((post)=>post._id!==action.payload._id)};
    case UPDATE:
      console.log("in update reducer");
      return {posts:state.posts.map((post)=>post._id!==action.payload._id?post:action.payload),myPosts:state.myPosts};
    case LIKE:
      console.log("in like reducer");
      //console.log(state.posts[0]._id);
      console.log(action);
      return {posts:state.posts.map((post)=>post._id!==action.payload._id?post:action.payload),myPosts:state.myPosts};
    case DISLIKE:
      console.log("in dislike reducer");
      return {posts:state.posts.map((post)=>post._id!==action.payload._id?post:action.payload),myPosts:state.myPosts}; 
    case FETCH_MY:
        console.log("In fetch my reducer");
        return {posts:state.posts,myPosts:action.payload}; 
    default:
      return state;
  }
};

