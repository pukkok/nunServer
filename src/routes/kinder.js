const express = require('express')
const router = express.Router()
const Kinder = require('../models/Kinder')
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../../auth')

// 본인 홈페이지 찾아갈때 브라우저에서 네비(유치원 홈페이지 클릭시)
router.post('/kinderUrl', isAuth, expressAsyncHandler( async(req, res, next) => { 
    const findUrl = await Kinder.findOne({kinderCode : req.user.kinderCode})
    if(findUrl){
        res.json({code: 200, msg: 'url 있음', url : findUrl.originUrl})
    }else{
        res.json({code: 419, msg: 'url 없음'})
    }
}))

router.get('/kinderData/:url', expressAsyncHandler( async(req, res, next) => {
    console.log(req.params)
    const result = await Kinder.findOne({originUrl: req.params.url})
    if(result.openPage){
        if(result){
            res.json({code: 200, msg: '데이터 전송 성공', result})
        }else{
            res.json({code: 400, msg: '데이터 전송 실패'})
        }
    }else{
        res.json({code: 400, msg: '페이지 게시 전입니다.'})
    }
}))

module.exports = router