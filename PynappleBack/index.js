const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')

const cors= require('cors')

const app = express();

require('dotenv').config();
require('./config/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    credentials: true
  }));
app.use('/api/v1', routes);
app.get('/gh',(req,res)=>{
    res.send("dfjgdgf")
})
app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
})

//