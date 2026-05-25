const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log('MongoDB Connected...');
    }).catch((err)=>{
        console.log('Error while creating MongoDB connection ',err);
    })