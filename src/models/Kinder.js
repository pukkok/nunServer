const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const KinderSchema = new Schema({
    kinderCode : {
        type: String,
        // required: true
    },
    // teacherList : [
    //     {
    //         type : ObjectId,
    //         ref: 'Teacher'
    //     }
    // ],
    // menuList : [
        
    // ]
    data: {
        type: Object
    },

    logoPath : {
        type: String
    },
    bgPath : [{
        type: String
    }]


})

const Kinder = mongoose.model('kinder', KinderSchema)

module.exports = Kinder
// 소속된 강사인가?