const { customFail } = require("./customResponces");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

async function verifyAdmin(req, res, next) {
  const token =
    req.headers.autorization ||
    req.headers.Autorization ||
    req.headers.Authorization ||
    req.headers.authorization;

  jwt.verify(token, process.env.JWT, async function (err, decoded) {
    if (err) {
      res.json(new customFail("unauthorized"));
      return;
    }
    const user = await UserModel.findById(decoded.id);
    const isAdmin = user.isAdmin;
    if (!isAdmin) {
      res.json(new customFail("unauthorized"));
      return;
    }

    req.user = decoded;
    next();
  });
}
module.exports = verifyAdmin;
