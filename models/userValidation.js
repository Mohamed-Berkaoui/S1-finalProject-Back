const {Schema,model, Types}=require('mongoose')

const validatonSchelma=new Schema({
    hash:{type:String},
    userId:Types.ObjectId
})


const validationModel=new model("validation",validatonSchelma)
module.exports=validationModel