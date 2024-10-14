const {Schema,model, Types}=require('mongoose')

const orderSchema=new Schema({
    userId:{type:Types.ObjectId,required:true,ref:"user"},
    orderdProducts:[{productId:{type:Types.ObjectId,ref:"product"},quantity:{type:Number},_id:0}],
    status:{type:String,enum:["pending","done","cancelled"],default:"pending"},
},{timestamps:true,versionKey:false})

const OrderModel=new model("order",orderSchema)

module.exports=OrderModel