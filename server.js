const express = require("express");
const asyncHandler = require("./utils/asyncHandler");
const {customError} = require("./utils/customResponces");
const { default: mongoose } = require("mongoose");
const path=require('path');
const ProductRouter = require("./routes/product");
const AuthRouter = require("./routes/auth");
const OrderRouter = require("./routes/order");
const CommentRouter = require("./routes/comment");


require("dotenv").config();

const app = express();
//app middelwares
app.use(express.static(path.join(__dirname,"uploads")))
app.use(express.json())


app.use('/api/product',ProductRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/order',OrderRouter)
 app.use('/api/comment',CommentRouter)




//404 handler
app.all(
  "*",
  asyncHandler(async function (req, res,next) {
 console.log("ehhhjhe")
 throw new customError('url not found')
  })
);

//errror handler
app.use(function (error, req, res, next) {

  res
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
