import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors';
import router from './router/login.js';
import dotenv from 'dotenv';
dotenv.config()


const app =express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(function(req,res,next){
    //console.log(req);
    console.log("kau");
    //console.log(res);
    next();
});
app.use(cors());
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,POST");
    next();
  });*/
app.use('/',router);

const CONNECTION_URL='mongodb://kaushik2:kaushik2@cluster0-shard-00-00.qlzvw.mongodb.net:27017,cluster0-shard-00-01.qlzvw.mongodb.net:27017,cluster0-shard-00-02.qlzvw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14fnxz-shard-0&authSource=admin&retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>app.listen(PORT,()=>console.log(`server running at port:${PORT}`)))
    .catch((error)=>console.log(`errror:${error.message}`));
mongoose.set('useFindAndModify',false);