const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const dayjs = require('dayjs')

const TeacherSchema = new Schema({

    name : {
        type : String,
        required: true,
        trim : true
    },
    organization : { // 유치원 명
        type : String,
        required: true
    },
    kinderCode : { // 유치원 코드
        type : String,
        required: true
    },
    isDirector : {
        type: Boolean,
        required: true,
    },

    isAdmin : {
        type: Boolean,
        default: false
    },

    email : {
        type : String,
    },
    phone : {
        type : String,
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
    
    createdAt : {
        type : Date,
        default : dayjs()
    },
    lastModifiedAt : {
        type : Date,
        default : dayjs()
    }
})

const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher