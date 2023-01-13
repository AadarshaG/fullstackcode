const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/fullstackcode';


mongoose.connect(dbUrl, (err,success)=>{
    if(err){
        console.log("Error >>>>>", err);
    }else{
        console.log("Connected to Mongoose.");
    }
})