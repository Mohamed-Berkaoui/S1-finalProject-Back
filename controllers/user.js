const UserModel = require("../models/user");
const catchDbErrors = require("../utils/catchDbErros");
const { customFail, customSuccess } = require("../utils/customResponces");

/**
 * @method put
 * @endpoint ~/api/user/update/:id
 * @description update user profile (without image)
 * @access user
 */

async function userUpdateProfileController(req, res) {
  const isAutorizedUser = req.user._id == req.params.id;
  if (!isAutorizedUser) {
    throw new customFail("unauthorized");
  }
  let updatedUser;
  if (!req.body.address) {
    updatedUser = await catchDbErrors(
      UserModel.findByIdAndUpdate(req.user._id,req.body, { returnDocument: "after" })
    );
  }
  else{
    updatedUser = await catchDbErrors(
        UserModel.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body.address}}, { returnDocument: "after" })
      );
      delete req.body.address
      updatedUser = await catchDbErrors(
        UserModel.findByIdAndUpdate(req.user._id,req.body, { returnDocument: "after" })
      );
  }

  res.json(new customSuccess(updatedUser));
}

/**
 * @method put
 * @endpoint ~/api/user/updateimage/:id
 * @description update user profile image
 * @access user
 */

async function updateUserImage(req, res) {
  const file = req.file;
  const isAutorizedUser = req.user._id == req.params.id;
  if (!isAutorizedUser) {
    throw new customFail("unauthorized");
  }
  const updatedUser = await catchDbErrors(
    UserModel.findByIdAndUpdate(
      req.user._id,
      { avatar: `/${file.filename}` },
      { returnDocument: "after" }
    )
  );

  res.json(new customSuccess(updatedUser));
}
module.exports = { userUpdateProfileController, updateUserImage };
