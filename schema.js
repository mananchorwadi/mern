const mongoose = require('mongoose')

const user = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    // SecondName : {
    //     type : String
    // },
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true 
    }
})

const userModel = mongoose.model('users',user)
module.exports = userModel