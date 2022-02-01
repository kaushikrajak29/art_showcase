import express from 'express';
import {loginUser} from '../controllers/login.js'
import {registerUser} from '../controllers/register.js'
import {getEmail,sendForgotPasswordEmail,resetPassword} from '../controllers/emails.js'
import { createPost,getPosts,deletePost,likePost, updatePost,getMyPosts, dislikePost} from '../controllers/post.js'
import { getUserInfo } from '../controllers/userinfo.js';



const router=express.Router();

router.get('/register',registerUser);
router.get('/login',loginUser);
router.post('/register',registerUser);
router.post('/login',loginUser);
//router.get(`/Users/:${email}`)
router.get('/emails/:email',getEmail);
//router.get('/verificationEmail/:email',sendVerificationEmail)
//router.post('/verify/:email',emailVerify)
router.get('/forgotPassword/:email',sendForgotPasswordEmail)
router.post('/resetPassword',resetPassword);
router.post('/createPost',createPost);
router.patch('/posts/:id/like',likePost);
router.patch('/posts/:id/delete',deletePost);
router.patch('/posts/:id/update',updatePost);
router.get('/users/user/posts',getMyPosts);
router.get('/posts',getPosts)
router.get('/users/user/userinfo',getUserInfo);
router.patch('/posts/:id/dislike',dislikePost);

export default router;