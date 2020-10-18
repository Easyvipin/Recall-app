const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

/* creating schema  */

const ItemSchema = new Schema({
    itemName:{
        type:String,
        required:true,
    },
    itemPlace:{
        type:String,
        required:true,
    },
}, {
    timestamps:{
       createdAt:'at'
    }
})

module.exports = Item = mongoose.model('item',ItemSchema);