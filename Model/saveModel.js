const mongoose = require('mongoose')

const saveSchema = mongoose.Schema({
    userID  :{type:String,required:true,ref:'userModel'},
    PasswordFor:{type:String,required:true},
    password:{type:String,required:true},
},{
    timestamps:true,
})

const saveModel = mongoose.model('saveModel',saveSchema)
module.exports = saveModel