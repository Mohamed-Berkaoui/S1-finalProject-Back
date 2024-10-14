const {Schema,model, Types}=require("mongoose")

const commentSchema=new Schema({
    comment:{type:String,required:true},
    rating:{type:Number,min:1,max:5},
    userId:{type:Types.ObjectId,required:true,ref:"user"},
    productId:{type:Types.ObjectId,required:true,ref:"product"},
})

const CommentModel=new model("comment",commentSchema)

module.exports=CommentModel