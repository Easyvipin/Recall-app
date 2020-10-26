const jwt = require("jsonwebtoken");
const User = require("../models/user");
 const getUser = (req, res,) => {
    let token = req.cookies.jwt;
    if (token) {
      jwt.verify(token,`${process.env.SECRET_KEY}`, async (error, decoded) => {
        if (error) {
          res.json({auth:false});
        } else {
          let user = await User.findById(decoded.id);
          console.log(user);
          res.json({auth:true,authId:user._id,authUser:user.userName})
        }
      });
    } else {
        res.json({auth:false});
    }
  };
  module.exports = getUser;