const jwt=require('jsonwebtoken')


function jwtGenerateToken(id){
   return jwt.sign({id:id}, process.env.JWT,{expiresIn:"15m"});
}

module.exports=jwtGenerateToken