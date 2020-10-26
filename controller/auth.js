const User = require("../models/user");
const List = require("../models/item");
const jwt =require("jsonwebtoken");

/* handle error */
const handleError=(e)=>{
let error = { username: "", password: "" };

  if (e.message === "Username doesn't exist") {
    error.username = "Username doesn't exist";
  }
  if (e.message === "Password is incorrect") {
    error.password = "Password is incorrect";
  }

  if (e.code == "11000") {
    error["username"] = "username not available";
  }
  return error;
}

/* create token */
const maxAge = 2 * 24 * 60 * 60;
const createToken=(id) =>{
  const key = process.env.SECRET_KEY;
   const token =  jwt.sign({id},`${key}`,{expiresIn:maxAge});
   return token;
}


module.exports.post_reg = async (req,res) =>{

  const {user,password} = req.body;
  try{
  const eachUser = await User.create({
    userName : user,
    password : password,
  })
  const eachList = await List.create({
    user:eachUser._id
  })
  const userToken = createToken(eachUser._id);
  res.cookie("jwt", userToken, { httpOnly: true });
  res.status(201).json({ user_id: eachUser._id ,authUser:loggedUser.userName});
 
  }
  catch(e){
    console.log(e);
    let error = handleError(e);
    res.status(200).json({ error });
  }
}

module.exports.post_login = async (req,res) =>{
  const {user,password} = req.body;
  try{
    const loggedUser = await User.login(user,password);
    const userToken = createToken(loggedUser._id);
    res.cookie("jwt", userToken, { httpOnly: true });
    res.status(201).json({ user_id: loggedUser._id ,authUser:loggedUser.userName});
  }
  catch(e){
    const error = handleError(e);
    res.status(200).json({ error });
  }
}
module.exports.logout = async(req,res) =>{
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.json({auth:false});
}