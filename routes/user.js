const { userUpdateProfileController, updateUserImage } = require('../controllers/user')
const asyncHandler = require('../utils/asyncHandler')
const UserRouter=require('express').Router()
const verifyUser = require('../utils/verifyUser')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.originalname.split('.')[1])
    },
  })


  const  fileFilter= function(req, file, cb) {
    console.log("🚀 ~ fileFilter ~ file:", file)

    if (!file.mimetype.includes('image') ) {
      return cb(new Error('I don\'t have a clue!'), false );
    }
    cb(null, true);
  }
const upload = multer({ storage: storage,fileFilter:fileFilter})

/**
 * @method put
 * @endpoint ~/api/user/update/:id
 * @description update user profile (without image)
 * @access user
 */
UserRouter.put("/update/:id",asyncHandler(verifyUser),asyncHandler(userUpdateProfileController))

/**
 * @method put
 * @endpoint ~/api/user/updateimage/:id
 * @description update user profile image
 * @access user
 */
UserRouter.put("/updateimage/:id",asyncHandler(verifyUser),upload.single("avatar"),asyncHandler(updateUserImage))


module.exports=UserRouter