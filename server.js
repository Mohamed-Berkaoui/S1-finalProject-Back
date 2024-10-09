const express = require("express")
const asyncHandler = require("./utils/asyncHandler")
const customError = require("./utils/CustemError")


require("dotenv").config()

const app=express()



app.all('*',asyncHandler(
    function(req,res){
    throw new customError('page not found',"fail",404)
    }
    
)
)

app.use(function(error,req,res,next){
    console.log(error)
    res.status(error.statusCode).json({status:error.status || "error",error:error.message})
}

)
const PORT=process.env.PORT || 8000
app.listen(PORT ,()=>console.log(`server running on http://localhost:${PORT}`))




