const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const dayjs = require('dayjs')

const TesterSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    organization: {
        type : String,
        default : '테스트유치원'
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
        default : dayjs()
    },
    lastModifiedAt : {
        type : Date,
        default : dayjs()
    }
})

const Tester = mongoose.model('Tester', TesterSchema)

module.exports = Tester