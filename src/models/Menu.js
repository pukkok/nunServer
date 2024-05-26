const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types : {ObjectId} } = Schema
const dayjs = require('dayjs')

const MenuSchema = new Schema({
    sideOptions : [
        {type : ObjectId, ref: 'SideOption'}
    ],
    createdAt : {
        type: Date,
        default : dayjs()
    },
    lastModifiedAt : {
        type: Date,
        default : dayjs()
    }
})

const SideOptionSchema = new Schema({
    userId : {
        type : ObjectId,
        ref: 'Tester'
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

const SubOptionSchema = new Schema({
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