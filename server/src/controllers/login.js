import User from './../models/User.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser=(req,res)=>{
    console.log("login called")
    const emailg=req.body.email;
    const passwordg=req.body.password;
    console.log(emailg,passwordg)
    User.findOne({email:emailg})
        .then((user)=>{
            if(!user)return res.json({msg:'Not Registered'});
            bycrpt.compare(passwordg,user.password,(err,result)=>{
                if(err) return res.status(400).json({error:err});
                else if(result==false)return res.json({loginSuccess:false,token:''})
                else if(result==true){
                    const playload={
                        id:user.email,
                        name:user.name
                    };
                    try{
                        jwt.sign(playload,process.env.JWT_KEY,(err,token)=>{
                            if(err)return res.json({loginSuccess:false,token:''})
                            return res.json({loginSuccess:true,token:token});
                        })
                            
                    }catch(error){
                        console.log(error);
                    }
                }
            })
        }).catch(error=>{
            console.log(error);
        })
}