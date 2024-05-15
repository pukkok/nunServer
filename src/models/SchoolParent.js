const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : { ObjectId }} = Schema
const moment = require('moment')

const SchoolParentSchema = new Schema({
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
    children : [
        {
            type : ObjectId,
            ref: 'Children'
        }
    ],
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
    createdAt : {
        type : Date,
        default : moment()
    },
    lastModifiedAt : {
        type : Date,
        default : moment()
    }
})

const SchoolParent = mongoose.model('SchoolParent', SchoolParentSchema)

module.exports = SchoolParent