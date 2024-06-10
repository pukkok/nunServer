const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const KinderSchema = new Schema({
    kinderCode : {
        type: String,
        required: true,
        unique: true
    },
    originUrl : {
        type: String,
    },
    data: {
        type: Object
    },
    openPage : {
        type: Boolean,
        default: false
    },
    menu: {
        type: ObjectId,
        ref: 'Menu'
    }

})

const Kinder = mongoose.model('kinder', KinderSchema)

module.exports = Kinder