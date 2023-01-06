var express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.get('/',function(req,res){
    res.send('successfully testing')
})

app.listen(port,()=>{
    console.log(`server started on ${port}`);
})