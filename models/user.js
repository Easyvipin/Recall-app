const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;
const bcrypt = require("bcrypt");

/* creating schema  */

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
}, {
    timestamps:{
       createdAt:'at'
    }
})

UserSchema.pre('save',async function(next){
 const salt = await bcrypt.genSalt(); // generate salt
 this.password = await bcrypt.hash(this.password, salt); // password hashing
 next();
})
UserSchema.statics.login = async function(user,password){
    const eachUser = await this.findOne({userName:user});
    if(eachUser){
    const result = await bcrypt.compare(password,eachUser.password);
    if(result == true){
        return eachUser;
    }
    else {
        throw Error("Password is incorrect");
    }
    }
    else {
        throw Error("Username doesn't exist")
    }
}
const User =   mongoose.model("user",UserSchema);
module.exports =User;
