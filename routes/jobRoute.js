const express = require("express");
const { JobModel } = require("../model/jobModel");


const jobRoute = express.Router();

jobRoute.post("/jobs", async (req, res) => {
  const {
    company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  } = req.body;
  try {
  let data = new JobModel({
    company:company,
    postedAt:postedAt,
    city:city,
    location:location,
    role:role,
    level:level,
    contract:contract,
    position:position,
    language:language
  });
  await data.save()
  res.send("Employee Data Added Successfully")
  } catch (err) {
   res.status(500)
   console.log(err)
  }
});
jobRoute.get("/jobs",async (req,res)=>{

try{
 const page = parseInt(req.query.page) - 1 || 0;
 const limit = parseInt(req.query.limit) || 0;
 const role = req.query.role;
 const query = {};
 const search = req.query.search || "";
 let sortVal=''
 let sort = req.query.sort ;
if(sort=="asc"){
sortVal=1
}else{
  sortVal=-1
}
  if (role) {
    query.role = role;
  }  
 
 let language = req.query.language || "All";
 const languages = ["Java","C","C++","JavaScript"];
 language === "All"
   ? (language = [...languages])
   : (language = req.query.language.split(","));


    const data = await JobModel.find(query)
    // {
    //   language: { $regex: search, $options: "i" },
    // }
      .where("language")
      .in([...language])
      .sort({postedAt:sortVal})
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(data);

}catch(err){
res.status(400).send("server error")
}

})




module.exports={
          jobRoute
}