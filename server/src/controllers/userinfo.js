import User from '../models/User.js'
import jwt from 'jsonwebtoken';

export const getUserInfo=(req,res)=>{
    console.log("get posts");
    const token =req.headers.token;
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            //console.log(result);
            
            User.findOne({email:result.email})
                .then((info)=>{
                    //console.log(posts);
                    //const resPosts=posts.filter((post)=>post.email!==result.email);
                    //console.log(info);
                    return res.status(200).json({name:info.name,email:info.email});
                })
                .catch((error)=>{
                    console.log(error);
                    return res.staus(404).send("error");

                });
                
        }
    });
}