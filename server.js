const express = require("express");
const asyncHandler = require("./utils/asyncHandler");
const {customError} = require("./utils/customResponces");
const { default: mongoose } = require("mongoose");
const path=require('path');
const ProductRouter = require("./routes/product");
const AuthRouter = require("./routes/auth");
const OrderRouter = require("./routes/order");
const CommentRouter = require("./routes/comment");
const UserRouter = require("./routes/user");
require("dotenv").config();
var cors = require('cors') 
//multer params
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })



const app = express();
//app middelwares
app.use(express.static(path.join(__dirname,"uploads")))
app.use(express.static(path.join(__dirname,"products")))
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/api/product',ProductRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/order',OrderRouter)
 app.use('/api/comment',CommentRouter)
 app.use('/api/user',UserRouter)




    
//404 handler
app.all(
  "*",
  asyncHandler(async function (req, res,next) {
 throw new customError('url not found')
  })
);

//errror handler
app.use(function (error, req, res, next) {

  res.status(error.statusCode)
    .json({ status: error.status , error: error.message });
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_URI, { dbName: "ecommerce" })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    )
  )
  .catch((error)=>console.log(error)) 
