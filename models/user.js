const bcrypt= require('bcryptjs')
const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    name: {type:String,required:true,minLength:3},
    email:{type:String,unique:[true,"email already used"],
        validate:{
            validator:(value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
            message:"not a vaild email"
        }
    },
    phone:{type:Number},
    password:{type:String,required:true},
    avatar:{type:String,default:"/images.png"},
    addresses:[{type:String}],
    isAdmin:{type:Boolean,default:false},
    validUser:{type:Boolean,default:false}
})

userSchema.pre('save', function(next) {
    const salt=bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password=hash
    next()
})

const UserModel=new model("user",userSchema)
module.exports=UserModel
