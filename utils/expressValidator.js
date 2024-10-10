
const {body}=require('express-validator')
function productTitileValidation(){
   return[ body("title").trim().isLength({ min: 3 })]
}
module.exports=productTitileValidation