//Multer: To uplaod the file to server from client

//npm i multer

const express= require('express');
const multer= require('multer');

const path = require("path");
const cors = require("cors");

const app = express();
// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application
app.use(cors());

//Disk Stroage: A string or function may be specified to determine the destination directory, and a function to determine filenames. 
//If no options are set, files will be stored in the system's temporary directory with random 32 character filenames.

const filestorageEngine=multer.diskStorage({
//accepts objects with 2 values i.e. destination and filename 

destination:(req,file,cb)=>{  //this function runs call back function
    //destination accepts 1. function that access request
    //2. file  
    //3. callback
    cb(null,'./uploaded files Storage');
    //callback takes error: here I have set it to null and the destination string:direct path from this index.js to wherever we want to save our uploaded files
    //./uploaded files Storage => folder where the uploaded files are saved.
},

filename:(req,file,cb)=>{

    cb(null,Date.now()+'..'+file.originalname);
    //here the file name is displayed with the "currentdate+..+filename.jpg/png/jpeg"
},
}); // NOW PASS THIS "filesstorageEngine" to middleware storage property.

//calling middleware
//storage: tells where and how files to e stored..
const upload= multer({storage:filestorageEngine});


// Route To Load Index.html page to browser
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });



//PASSING THIS TO ROUTE:
//Passing middleware "upload" to this route as middleware
//and we can run many function on that uplaod middleware like single,multiple...
//single(fieldName: string): 
app.post("/single",upload.single('image'),(req,res)=>{
    
    console.log(req.file); //to view the synced file //To view the file details
    res.send('Single File Uploaded Successfully');
});


//POSTMAN :
//Post: http://localhost:3000/single  => body:form-data=> key:file ; key should be matched with what we are searching for 
//here key:images; value:select any file

//Initial output
//node index.js
// {
//     fieldname: 'image',
//     originalname: 'pexels-rahul-dogra-5363009.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './uploaded files Storage',
//     filename: '1625212412883..pexels-rahul-dogra-5363009.jpg',
//     path: 'uploaded files Storage\\1625212412883..pexels-rahul-dogra-5363009.jpg',
//     size: 3169457
//   }


//UPLOADING MULTIPLE FILES:

app.post('/multiple',upload.array('images',3),(req,res)=>{
    //upload.array() ==> for multiple files uploading 
    //upload.array() ==> takes 2 parameters : 1. filename 2. max. no. of. files to be uploaded.
    console.log(req.files);
    res.send('Multiple files uploaded successfully');
});


//POSTMAN :
//Post: http://localhost:3000/multiple  => body:form-data=> key:file ; key should be matched with what we are searching for 
//here key:images; value:select 3 files

app.listen(5000);
