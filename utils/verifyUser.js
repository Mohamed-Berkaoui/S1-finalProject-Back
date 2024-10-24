const { customFail } = require("./customResponces");
const jwt = require("jsonwebtoken");
const UserModel=require('../models/user');
const catchDbErrors = require("./catchDbErros");

async function verifyUser(req, res, next) {
  const token =     req.headers.autorization ||
  req.headers.Autorization ||
  req.headers.Authorization ||
  req.headers.authorization;
   jwt.verify(token, process.env.JWT, async function (err, decoded) {
    if (err) {
      res.status(403).json(new customFail("unauthorized")) 

      return
    }
    const user=await catchDbErrors(UserModel.findById(decoded.id,{password:0}))
    req.user=user
    next();
  });

}
module.exports = verifyUser;
