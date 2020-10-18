const express = require("express");
const mongoose = require('mongoose');
const bodyParser =require("body-parser");
const path = require('path');
const items = require("./Routes/api/itemRoute");
const app = express();

/* BODYPARSER MIDDLEWARE */
app.use(bodyParser.json());
const db = require("./config/keys").mongoURI;

//Connect to mongo
mongoose
.connect(db)
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));

/* port */
app.use('/api/items',items);

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