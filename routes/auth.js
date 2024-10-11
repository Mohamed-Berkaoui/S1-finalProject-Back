const { registerController, loginController } = require('../controllers/auth')
const asyncHandler = require('../utils/asyncHandler')

const authRouter=require('express').Router()

/**
 * @method post
 * @endpoint  ~/api/auth/register
 * @description register a new user
 * @accsess visitor
 *  */
authRouter.post("/register",asyncHandler(registerController))


/**
 * @method post
 * @endpoint  ~/api/auth/login
 * @description login  user
 * @accsess visitor
 *  */
authRouter.post("/login",asyncHandler(loginController))

module.exports=authRouter