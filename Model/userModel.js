const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now
    },
    
},
{
    timestamps:true,
})

const userModel = mongoose.model('userModel',userSchema)
module.exports = userModel