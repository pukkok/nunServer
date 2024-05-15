const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const moment = require('moment')

const TeacherSchema = new Schema({
    isTeacher : {
        type : Boolean,
        required: true
    },
    organization : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : false
    },
    phone : {
        type : String,
        required : false
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
    isDirector : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : moment()
    },
    lastModifiedAt : {
        type : Date,
        default : moment()
    }
})

const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher