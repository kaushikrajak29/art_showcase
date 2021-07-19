import User from "../models/User.js";
import bcrypt from 'bcrypt';
import isempty from 'is-empty';
import validator from 'validator';


const isvalidreq=(req)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    if(isempty(name)||isempty(password)||isempty(name))return {correct:false,msg:'one or more entery is empty'};
    if(!validator.isEmail(email))return {correct:false,msg:'Enter a valid Email'};
    if(!validator.isStrongPassword(password))return {correct:false,msg:'please enter a strong password'};
    return {correct:true,msg:'corrent entry'};
}

export const registerUser=(req,res)=>{
    console.log("register called");
    const temp=isvalidreq(req);
    if(temp.correct==false)return res.status(404).json({msg:`not valid input : ${temp.msg}`});
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.json({registrationSuccess:false});
            }
            else{
                
                const user=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                });
                try{
                    bcrypt.hash(user.password,10,(err,hash)=>{
                        if(err) console.log(err);
                        user.password=hash;
                        user.save()
                            .then((user)=>{
                                res.json({registrationSuccess:true});
                            })
                            .catch(error=>{
                                console.log(error);
                                res.json({registrationSuccess:false});
                            });
                    })
                }catch(error){
                    console.log(error);
                    res.json({registrationSuccess:false});
                }          
            }
        })
        .catch(error=>console.log(error));
}