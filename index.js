const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// install nodemailer and get this code from npm nodemailer
const nodemailer = require("nodemailer");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://sakthijessy26:123@cluster0.1l1qo.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("success")
}).catch(function(){
    console.log("failed")
})

// create model for mongodb
const credential=mongoose.model("credential",{},"bulkmail")




app.post("/mail",function(req,res){
    console.log(req.body.msg)

    var msgz=req.body.msg
    var emailList=req.body.emailList

   // find the data
credential.find().then(function(data){
   
    const transporter = nodemailer.createTransport({
        service:"gmail",
         auth: {
           user:data[0].toJSON().user,
           pass:data[0].toJSON().pass,
           
         },
         
       });
    //    console.log(data[0])

       new Promise(async function(resolve,reject){
        try{
            for(i=0;i<emailList.length;i++)
                {
                    await transporter.sendMail(
                        {
                            from:"sakthijessy26@gmail.com",
                            to:emailList[i],
                            subject:"this email is from bulkmail project",
                            text:msgz
                        },
                    
                      
                    )
                    console.log("email sent to"+emailList[i])
                }
                resolve("success")
        }
        catch{
            reject("failed")
        }
    
    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })

}).catch(function(error){
    console.log(error)
})
    
})


app.listen(4000,'0.0.0.0', () => {
    console.log("Server Started.....");
});