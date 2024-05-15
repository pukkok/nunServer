const mongoose = require('mongoose')
const { Schema } = mongoose

const Certificate = new Schema({
    key : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required: true
    },
    organization : {
        type : String,
        required: true
    },
    organizationCode : {
        type : String,
        required: true
    }
    
})