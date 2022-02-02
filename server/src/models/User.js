import mongoose from 'mongoose';

const UserSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    emailVerified:{
        type:Boolean,
    }
});

const User=mongoose.model('User',UserSchema);
export default User;