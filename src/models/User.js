const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const moment = require('moment')

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    isDirector : {
        type : Boolean,
        default : false
    },
    isTeacher : {
        type : Boolean,
        default : false
    },
    createAt : {
        type : Date,
        default : moment()
    },
    lastModifiedAt : {
        type : Date,
        default : moment()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User