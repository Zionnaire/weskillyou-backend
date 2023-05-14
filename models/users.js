const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: String,
    email:{
        type:String,
        unique: [true,'Please enter a valid email']
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    password:{
        type: String,
        minLength: 8
    }
})

module.exports = mongoose.model("Users", userSchema)