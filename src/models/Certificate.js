const mongoose = require('mongoose')
const { Schema } = mongoose

const CertificateSchema = new Schema({ // 교육청 소속인지?
    key : { //password
        type : String,
        required : true,
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    organization : { // 유치원 명
        type : String,
        required: true
    },
    organizationCode : { // 유치원 코드
        type : String,
        required: true
    },
    isDirector : {
        type: Boolean,
        required: true,
        unique: true
    }
})

const Certificate = mongoose.model('Certificate', CertificateSchema)

module.exports = Certificate