const mongoose = require('mongoose')
const { Schema } = mongoose

const KinderSchema = new Schema({
    kinderCode : {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Object
    },
    logoPath : {
        type: String
    },
    bgPath : {
        type: String
    },
    addBgList: [
        { type: String }
    ]


})

const Kinder = mongoose.model('kinder', KinderSchema)

module.exports = Kinder
// 소속된 강사인가?