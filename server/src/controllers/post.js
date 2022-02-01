import Post from '../models/Post.js'
import jwt from 'jsonwebtoken';

export const getPosts=(req,res)=>{
    console.log("get posts");
    const token =req.headers.token;
    //console.log(req);
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            //console.log(result);
            
            Post.find()
                .then((posts)=>{
                    //console.log(posts);
                    const resPosts=posts.filter((post)=>post.email!==result.email);
                    return res.status(200).json(resPosts);
                })
                .catch((error)=>{
                    console.log(error);
                    return res.staus(404).send("error");

                });
                
        }
    });


}
export const createPost=(req,res)=>{
    //console.log(req.body);
    const token =req.body.token;
    const data=req.body.data;
    //console.log(data);
    console.log("create post");
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.json({success:false,msg:"Can not be uploaded"});
        }else{
            //console.log(result);
            const post=new Post({
                email:result.email,
                title:data.title,
                about:data.about,
                tags:data.tags,
                selectedFile:data.selectedFile,
                likes:{count:0,users:[]},
            });
            post.save()
                .then((post)=>{
                    //console.log(`sucessfully created an post ${post}`);
                    res.status(200).json(post);
                })
                .catch(error=>{
                    console.log(error);
                    res.status(404).json("error");
                }); 
        }
    })
}

export const likePost=(req,res)=>{
    console.log("like posts");
    const token =req.body.header.token;
    //console.log(token);
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            const {id}=req.params;
            //console.log(id);
            Post.findById(id)
                .then((post)=>{
                    //console.log(post);
                    Post.findByIdAndUpdate(id,{likes:{count:post.likes.count+1,users:[...post.likes.users,{email:result.email}]}},{new:true})
                        .then((newpost)=>{
                            res.status(200).json(newpost);
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.status(404).json("error");
                        })
                })
                .catch((error)=>{
                    console.log(error);
                    res.status(404).json("error");
                })
        }
    })
}

export const dislikePost=(req,res)=>{
    console.log("dislike posts");
    const token =req.body.header.token;
    //console.log(token);
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            const {id}=req.params;
            //console.log(id);
            Post.findById(id)
                .then((post)=>{
                    //console.log(post);
                    const likedUsers=post.likes.users;
                    const tempLikedUsers=likedUsers.filter((users)=>users.email!=result.email);
                    //console.log(tempLikedUsers);
                    Post.findByIdAndUpdate(id,{likes:{count:tempLikedUsers.length,users:tempLikedUsers}},{new:true})
                        .then((newpost)=>{
                            res.status(200).json(newpost);
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.status(404).json("error");
                        })
                })
                .catch((error)=>{
                    console.log(error);
                    res.status(404).json("error");
                })
        }
    })
}

export const deletePost=(req,res)=>{
    console.log("delete post");
    const token =req.body.header.token;
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            const {id}=req.params;
            //console.log(id);
            Post.findByIdAndDelete(id)
                .then(()=>{
                    res.status(200).json(id);
                })
                .catch((error)=>{
                    console.log(error);
                    res.status(404).json("error");
                });
        }
    })
}

export const updatePost=(req,res)=>{
    const token =req.body.header.token;
    //const data=req.body.data;
    //console.log(data);
    console.log("update post");
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.json({success:false,msg:"Can not be uploaded"});
        }else{
            //console.log(result);
            const tempPost=req.body.body;

            Post.findByIdAndUpdate(tempPost._id,tempPost,{new:true})
                .then((post)=>{
                    //console.log(`sucessfully created an post ${post}`);
                    res.status(200).json(post);
                })
                .catch(error=>{
                    console.log(error);
                    res.status(404).json("error");
                }); 
        }
    })
}

export const getMyPosts=(req,res)=>{
    console.log("get posts");
    const token =req.headers.token;
    //console.log(req);
    jwt.verify(token,process.env.JWT_KEY,(error,result)=>{
        if(error||result==null||result.email==null){
            console.log("wrong token");
            return res.status(404).json({success:false,msg:"Can not be uploaded"});
        }else{
            //console.log(result);
            
            Post.find()
                .then((posts)=>{
                    //console.log(posts);
                    const resPosts=posts.filter((post)=>post.email===result.email);
                    return res.status(200).json(resPosts);
                })
                .catch((error)=>{
                    console.log(error);
                    return res.staus(404).send("error");

                });
                
        }
    });


}