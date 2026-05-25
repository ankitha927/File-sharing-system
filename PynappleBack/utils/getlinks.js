const File = require("../models/file");

let count=0;
const Links=async(req,res)=>{
    const uid=req.body.data
try{
    // console.log(req.body)
    const files = await File.find({user:uid});
    count++;
    // console.log("called getlinks",count)
           
    return res.status(200).json({'links':files})
}
catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error', err, state: false });
}
}







module.exports={
    Links
}