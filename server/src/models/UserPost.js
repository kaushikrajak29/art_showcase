import mongoose from 'mongoose';
//import User from 'User.js';
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    posts:[
        {
            email:{
                type:String,
                unique:true,
            },
            date:{
                type:Date,
                default:Date.now
            },
            title:{
                type:String,
                require:true,
            },
            about:{
                type:string
            },
            tags:{
                type:string
            }
        }
    ]
});

const UserPost=mongoose.model('UserPost',UserSchema);
export default UserPost;