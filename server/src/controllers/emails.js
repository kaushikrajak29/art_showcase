import User from './../models/User.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const getEmail=(req,res)=>{
    const email=req.params.email;
    console.log("getEmail called");
    console.log(email);
    User.findOne({email:email})
        .then(user=>{
            if(user)return res.json({email:user.email});
            else return res.json({})
        })
        .catch(error=>{
            return res.status(404).json(error);
        });
}


const sendForgetPasswordEmailutil=async(email,token)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        },
    });
    try{
        let info = await transporter.sendMail({
            from: 'kauartsshowcase',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<a href="${process.env.CLIENT_URL}/resetPassword/${token}" > click the link to reset password</a></br>
                    <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>`, 
        });
        console.log(info);
    }catch(error){
        console.log(error);
    }
}

export const sendForgotPasswordEmail=(req,res)=>{
    const email=req.params.email;
    User.findOne({email:email})
        .then((user)=>{
            if(!user){
                return res.json({success:false,msg:"User is not registered"});
            }
            else{
                const playload={
                    id:user._id,
                    email:user.email,
                    name:user.name
                };
                try{
                    jwt.sign(playload,process.env.JWT_KEY,{expiresIn: 600},(err,token)=>{
                        if(err)return res.json({success:false,msg:"Unable to generate link"})
                        sendForgetPasswordEmailutil(email,token)
                        res.json({success:true,msg:`Password reset link has been send to ${email}`})
                    })
                       
                }catch(error){
                    console.log(error);
                }
            }
        })
        .catch(error=>{
            console.log(error);
        });
}

export const resetPassword=(req,res)=>{
    const token =req.body.token;
    const password=req.body.password;
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            return res.json({success:false,msg:"Link is incorrect or has been expired"});
        }else{
            console.log(result);
            bcrypt.hash(password,10,(error,hashval)=>{
                if(error) {
                    console.log(error);
                    return res.json({success:false,msg:"Sorry! Cannot reset your password now."});
                }
                User.findByIdAndUpdate(result.id,{password:hashval},{new:true})
                    .then(obj=>{
                        console.log(obj);
                        return res.json({success:true,msg:"Password has been reset"});
                    })
                    .catch(error=>{
                        console.log(error);
                        return res.json({success:false,msg:"Sorry! Cannot reset your password now."});
                    })
            })
        }
    })
}