const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const items = require("./Routes/api/itemRoute");
const auth =require("./Routes/api/userRoutes");
const getUser = require("./middeware/authMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

/* BODYPARSER MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());
const db = require("./config/keys").mongoURI;

//Connect to mongo
mongoose
.connect(db)
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));

/* port */
app.use('/check',getUser);
app.use('/api/items',items);
app.use('/auth',auth);

if(process.env.NODE_ENV === 'production'){
 app.use(express.static('client/build'));
 app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))  
 })
 
}
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("server is up and running");
})