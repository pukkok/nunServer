const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const dayjs = require('dayjs')

const TeacherSchema = new Schema({

    teacherInfo : { 
        type : ObjectId,
        ref: 'Certificate',
        required: true
    },
    // 필요한 정보(인증서 정보)
    // isTeacher, organization, name, isDirector

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