var express = require("express");  
var path = require("path");  
var mongo = require("mongoose");   
var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var db = require("./config.js");  
  
var app = express();  
var port = process.env.port || 7778;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'7mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'7mb'}));  
  
  
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var CustomerSchema = new Schema({      
    name: { type: String   }, 
    accountnumber: { type: String   }, 
    ifsc: { type: String   },
    address: { type: String   },     
    email: { type: String },       
    contact: { type: String },       
},{ versionKey: false });  
   
  
var model = mongoose.model('Customer', CustomerSchema, 'Customer');  
  
//api for get data from database  
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
  
//api for Delete data from database  
app.post("/api/Removedata",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Account has been Deleted successfully..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
app.post("/api/Updatedata",function(req,res){   
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name,ifsc: req.body.ifsc, accountnumber: req.body.accountnumber, address: req.body.address, contact: req.body.contact,email:req.body.email },   
function(err) {  
 if (err) {  
 res.send(err);  
 return;  
 }  
 res.send({data:"Account has been Updated successfully..!!"});  
 });  
})    
  
  
//api for Insert data from database  
app.post("/api/savedata",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Account has been Inserted successfully..!!"});  
            }  
        });  
})  
      
// call by default index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(port,function(){   
    console.log("server start on port"+ port);  
})  