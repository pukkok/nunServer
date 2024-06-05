const express = require('express')
const router = express.Router()
const Kinder = require('../models/Kinder')
const expressAsyncHandler = require('express-async-handler')

router.post('/download/data', expressAsyncHandler( async(req, res, next) => {
    const personalKinder = await Kinder.findOne({kinderCode : req.user.kinderCode})
    const result = personalKinder.data

    if(result){
        res.json({code : 200, msg: '파일 전송 성공', result})
    }else{
        res.json({code: 400, msg: '파일 전송 실패'})
    }
    
}))

module.exports = router