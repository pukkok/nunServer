const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const KinderSchema = new Schema({
    organization : {
        type: String,
        required: true
    },
    kinderCode : {
        type: String,
        required: true
    },
    teacherList : [
        {
            type : ObjectId,
            ref: 'Teacher'
        }
    ],
    menuList : [
        
    ]
})

// 소속된 강사인가?