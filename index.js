const express=require('express');
const app=express();
var user=require('./router.js')
app.use('/user',user);
app.listen(3030,(req,res)=>{
    console.log("RUNNING.....")
})