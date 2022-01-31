import axios from 'axios';

export const createPost = (newPost) => axios.post('/server/createPost', newPost);
export const fetchPosts= (auth)=>axios.get('/server/posts',{headers:{token:auth.token}});
export const deletePost=(obj)=>axios.patch(`/server/posts/${obj.id}/delete`,{header:{token:obj.token}});
export const likePost=(obj)=>axios.patch(`/server/posts/${obj.id}/like`,{header:{token:obj.token}});
export const dislikePost=(obj)=>axios.patch(`/server/posts/${obj.id}/dislike`,{header:{token:obj.token}});
export const updatePost=(obj)=>axios.patch(`/server/posts/${obj.id}/update`,{body:obj.post,header:{token:obj.token}});
export const fetchPost=(obj)=>axios.get(`/server/posts/${obj.id}`,{header:{token:obj.token}});
export const getMyPosts=(obj)=>axios.get(`/server/users/user/posts`,{headers:{token:obj.token}});
