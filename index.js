const express=require("express")
const mongoose = require("mongoose");
const {connection}=require("./config/db")
const {  jobRoute}=require("./routes/jobRoute")
const app=express()

app.get("/",(req,res)=>{
          res.send({"Route":"/jobs","sort":"asc/desc","role(filter)":"Fontent/Backend/FullStack"});
})
app.use(express.json());
app.use("/",jobRoute)



app.listen(8080,async()=>{
   try{
await connection
console.log("connected with Database")
    }catch(err){
console.log(err)
    }
    
}
)