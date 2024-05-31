const mongoose = require('mongoose')
const { Schema } = mongoose
const dayjs = require('dayjs')

const childrenSchema = new Schema({
    organization : {
        type : String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    class : {
        type : String,
        required : true
    },
    birth : {
        type : Date,
        required : true
    },
    parentName : [
        {
            type : Object,
            required : true
        }
    ],
    createdAt : {
        type : Date,
        default: dayjs()
    },
    lastModifiedAt : {
        type : Date,
        default : dayjs()
    }
})

const Children = mongoose.model('Children', childrenSchema)

module.exports = Children