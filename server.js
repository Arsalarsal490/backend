const express = require('express')
var app = express()
const jwt =require('jsonwebtoken')
var bodyParser = require('body-parser')
require('./database/connection')

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())






// const FileUpload = require('./route/fileuploads')
// app.use('/fileupload',FileUpload)




const productrouter = require('./route/product-route')
app.use('/baroque_product',productrouter)

const userrouter = require('./route/userroute')
app.use('/baroque_register',userrouter)

app.get('/welcome',(req,res)=>{
    res.send("i m working well")
})

app.set('secretKey',"password is password 24942494")


function validateUser(req,res,next){
   jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),function(err){
    if(err){
        res.json({'status':"Authorization",message:err.message})
    }
    else{
        next()
    }
   })



}






app.listen(5300,()=>{
    console.log("express is running on the port")
})
