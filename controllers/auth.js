const UserModel = require("../models/user");
const catchDbErrors = require("../utils/catchDbErros");
const { customFail, customSuccess } = require("../utils/customResponces");
const bcrypt=require('bcryptjs');
const jwtGenerateToken = require("../utils/jwtGenerateToken");
/**
 * @method post
 * @endpoint  ~/api/auth/register
 * @description register a new user
 * @accsess visitor
 *  */
async function registerController(req, res) {
  const existEmail = await catchDbErrors(UserModel.findOne({ email: req.body.email }))
  if (existEmail) {
    throw new customFail("mail allready used");
  }
  const newUser = new UserModel(req.body);
  await catchDbErrors(newUser.save());
  res.json(new customSuccess(newUser));
}

/**
 * @method post
 * @endpoint  ~/api/auth/login
 * @description login user
 * @accsess visitor
 *  */
async function loginController(req,res){

    let existUser= await catchDbErrors(UserModel.findOne({email:req.body.email},{isAdmin:0,__v:0}))
    if(!existUser){
        throw new customFail('somthing went wrong1 ')
    }
    const isMatchPassword=bcrypt.compareSync(req.body.password,existUser.password)

    if(!isMatchPassword){
        throw new customFail('somthing went wrong 2 ')
    }

    const token=jwtGenerateToken(existUser._id)
existUser.password=""

    res.json(new customSuccess({token:token,user:existUser}))
}
module.exports = { registerController,loginController };
