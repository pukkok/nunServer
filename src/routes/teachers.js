const express = require('express')
const Teacher = require('../models/Teacher')
const Children = require('../models/Children')
const expressAsyncHandler = require('express-async-handler')
const Certificate = require('../models/Certificate')
const { generateToken, isAuth } = require('../../auth')
const { validationResult } = require('express-validator')
const { validateUserId, validateUserEmail, validateUserPhone, validateUserPassword } = require('../../validator')

const router = express.Router()

// 인증서 처리
const certificate = expressAsyncHandler( async(req, res, next) => {
    const certificate = await Certificate.findOne({ key : req.body.key, password: req.body.password })

    if(certificate){
        const { name, organization, kinderCode, isDirector } = certificate
        res.json({ code: 200, msg: '인증되었습니다.', data: {name, organization, kinderCode, isDirector}})
    }else{
        res.json({ code: 404, msg: '인증서를 찾을수 없습니다.'})
    }
})

router.post('/join/step1', certificate)

// 아이디 중복확인 처리
router.post('/join/id-check', validateUserId(), expressAsyncHandler( async(req, res, next) => {
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        res.json({
            code: 400,
            msg: errs.array()[0].msg,
            err: errs.array()
        })
    }else{
        const user = await Teacher.findOne({userId : req.body.userId})
        if(user){
            res.json({code: 401, msg: '이미 존재하는 아이디입니다.'})
        }else{
            res.json({code: 200, msg: '사용 가능한 아이디입니다.'})
        }
    }
}))

// 교사 회원가입
router.post('/join/step2', [
    validateUserId(),
    validateUserPassword()
],
expressAsyncHandler( async(req, res, next) => {
    if(req.body.phone) validateUserPhone()
    next()
}),
expressAsyncHandler( async(req, res, next) => {
    if(req.body.email) validateUserEmail()
    next()
}),
expressAsyncHandler( async(req, res, next) => {
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        return res.json({
            code: 400,
            msg: errs.array()[0].msg,
            err: errs.array()
        })
    }else{
        const {name, isDirector, organization, kinderCode, 
            email, phone, userId, password, confirmPassword} = req.body
    
        let isAdmin = false 
        if(isDirector){ // 원장이라면 권한 바로 주기
            isAdmin = true
        }
    
        const teacher = new Teacher({
            name, isDirector, organization, kinderCode,
            email, phone, userId, password, confirmPassword, isAdmin
        })
    
        const success = await teacher.save()
        if(success){
            res.json({code: 200, msg: '회원가입 완료'})
        }else{
            res.json({code: 401, msg: '회원가입 실패'})
        }
            
    }

}))

router.post('/login', 
expressAsyncHandler( async(req, res, next) => {
    const loginTeacher = await Teacher.findOne({
        userId : req.body.userId,
        password: req.body.password
    })

    if(!loginTeacher){
        res.status(401).json({ code: 401, msg: '아이디나 비밀번호를 확인해주세요'})
    }else{
        const { name, email, userId, organization, isAdmin, createdAt } = loginTeacher
        res.json({
            code: 200,
            token: generateToken(loginTeacher),
            msg : '로그인 완료',
            data : {name, email, userId, isAdmin, organization, createdAt}
        })
    }

}))

module.exports = router