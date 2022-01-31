import mongoose from 'mongoose';

const UserSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
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
        type:String,
    },
    tags:{
        type:String
    },
    likes:{
        count:{
            type:Number,
            require:true,
        },
        users:[{
            email:{
                type:String,

            },
        }]
    },

    selectedFile: {
        type:String,
        require:true
    }
});

const Post=mongoose.model('Post',UserSchema);
export default Post;