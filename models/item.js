const mongoose = require("mongoose");
const {Schema} = mongoose;

const ListSchema = new Schema({
    items:[{
        itemName:String,place:String
    }],
    user :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]      
})
const List = mongoose.model("List",ListSchema)
module.exports = List;