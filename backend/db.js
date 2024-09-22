const secureurl = require('./ddd')

const mongoose=require('mongoose');

const mongoURI=secureurl;

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports=connectToMongo