import express from 'express';
import {loginUser} from '../controllers/login.js'
import {registerUser} from '../controllers/register.js'
import {getEmail,sendForgotPasswordEmail,resetPassword} from '../controllers/emails.js'

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
export default router;