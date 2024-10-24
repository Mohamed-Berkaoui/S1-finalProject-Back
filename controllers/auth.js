const UserModel = require("../models/user");
const catchDbErrors = require("../utils/catchDbErros");
const { customFail, customSuccess } = require("../utils/customResponces");
const bcrypt = require("bcryptjs");
const jwtGenerateToken = require("../utils/jwtGenerateToken");
const validationModel = require("../models/userValidation");
const main = require("../utils/nodemailer");
/**
 * @method post
 * @endpoint  ~/api/auth/register
 * @description register a new user
 * @accsess visitor
 *  */
async function registerController(req, res) {
  const existEmail = await catchDbErrors(
    UserModel.findOne({ email: req.body.email })
  );
  if (existEmail) {
    throw new customFail("mail allready used");
  }
  const newUser = new UserModel(req.body);
  await catchDbErrors(newUser.save());
  const hash=require("crypto").randomBytes(16).toString('hex')
  main(newUser.email,hash).catch(e=>console.log(e))
  await validationModel.create({hash:hash,userId:newUser._id})
  res.json(new customSuccess(newUser));
}

/**
 * @method post
 * @endpoint  ~/api/auth/login
 * @description login user
 * @accsess visitor
 *  */
async function loginController(req, res) {
  let existUser = await catchDbErrors(
    UserModel.findOne({ email: req.body.email }, { isAdmin: 0, __v: 0 })
  );
  if (!existUser) {
    throw new customFail("somthing went wrong1 ");
  }
  if(!existUser.validUser) {throw new customFail('user not valid')}
  console.log(existUser)
  const isMatchPassword = bcrypt.compareSync(
    req.body.password,
    existUser.password
  );

  if (!isMatchPassword) {
    throw new customFail("somthing went wrong 2 ");
  }

  const token = jwtGenerateToken(existUser._id);
  existUser.password = "";

  res.json(new customSuccess({ token: token, user: existUser }));
}





/**
 * @method post
 * @endpoint  ~/api/auth/loginadmin
 * @description login user
 * @accsess visitor
 *  */

async function loginAdminController(req, res) {
  
  let existUser = await catchDbErrors(
    UserModel.findOne({ email: req.body.email }, { __v: 0 })
  );
  if (!existUser) {
    throw new customFail("somthing went wrong1 ");
  }

  const isMatchPassword = bcrypt.compareSync(
    req.body.password,
    existUser.password
  );
  

  if (!isMatchPassword) {
    throw new customFail("somthing went wrong 2 ");
  }

  if(!existUser.isAdmin){
    throw new customFail("somthing went wrong 3 ");

  }


  const token = jwtGenerateToken(existUser._id);
  existUser.password = "";

  res.json(new customSuccess({ token: token, user: existUser }));
}

/**
 * @method post
 * @endpoint  ~/api/auth/checktoken
 * @description checktoken admin
 * @accsess admin
 *  */
async function checkTokenController(req, res) {
  
  res.json(new customSuccess('token valid'))
  }

/**
 * @method get
 * @endpoint  ~/api/auth/validateUser/:hash
 * @description validate user
 * @accsess visitor
 *  */
async function validateUserController(req, res) {
    
    const validate=await validationModel.findOne({hash:req.params.hash})
      await UserModel.findByIdAndUpdate(validate.userId,{validUser:true})
      await  validationModel.deleteOne({hash:req.params.hash})
    res.json("SUCCESS")
  }


module.exports = { registerController, loginController,loginAdminController,checkTokenController,validateUserController };
