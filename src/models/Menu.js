const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : {ObjectId} } = Schema
const dayjs = require('dayjs')

const MenuSchema = new Schema({
    kinderCode: {
        type: String,
        required: true,
        unique: true
    },

    deleteYOIL : {
        type: Array
    },

    sideOptions : {
        type: Array
    },

    addAllergyList : {
        type: Array
    },
    
    createdAt : {
        type: Date,
        default : dayjs()
    },
    lastModifiedAt : {
        type: Date,
        default : dayjs()
    }
    
})

const SideOptionSchema = new Schema({ // 오늘의 한상, 단백질, 간식
    userId : {
        type : ObjectId,
        ref: 'Teacher'
    },
    optionName : {
        type: String,
    },
    dayInfo : {
        type: Date,
        required: true
    },
    optionList : [
        { type : String }
    ],
    subOptionName : {
        type : String,
    }
})

const SubOptionSchema = new Schema({ // 알레르기 입력
    userId : {
        type : ObjectId,
        ref: 'Teacher'
    },
    subOptionName : {
        type: String
    },
    subOptionList : [
        {type: String}
    ]
})

const Menu = mongoose.model('Menu', MenuSchema)
const SideOption = mongoose.model('SideOption', SideOptionSchema)
const SubOption = mongoose.model('SubOption', SubOptionSchema)
module.exports = {
    Menu, SideOption, SubOption
}

// 연도/ 월 / 일 저장하기
// 사이드 옵션 저장하기
// 옵션에 대한 리스트 저장하기
// {사이드 옵션 : [리스트] }
// {사이드 옵션 : [리스트] }