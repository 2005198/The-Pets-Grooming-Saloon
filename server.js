import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//accessing values form env variable 
const PORT=process.env.PORT;
const URI=process.env.URI


//creating express_app 
const api = express();



//connection string for mongodb 
mongoose.connect(URI)
.then(()=>{
    console.log("CONNECTED TO DATABASE")
})
.catch((err)=>{console.error(err)});

api.use(express.static("../MERN_EXERCISE-/frontend/dist"))





//PORT 
api.listen(PORT,()=>{
    console.log("WORKING !!");

})