const express = require('express')
const Teacher = require('../models/Teacher')
const Children = require('../models/Children')
const expressAsyncHandler = require('express-async-handler')
const { generateToken } = require('../../auth')
const Certificate = require('../models/Certificate')

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

router.post('/join/id-check', expressAsyncHandler( async(req, res, next) => {
    if(req.body.userId === ''){
        res.json({code: 400, msg: '아이디를 입력해주세요.'})
    }
    const user = await Teacher.findOne({userId : req.body.userId})
    if(user){
        res.json({code: 401, msg: '이미 존재하는 아이디입니다.'})
    }else{
        res.json({code: 200, msg: '사용 가능한 아이디입니다.'})
    }
}))

// 교사 회원가입
router.post('/join/step2', 
expressAsyncHandler( async(req, res, next) => {
    const {name, isDirector, organization, organizationCode, 
        email, phone, userId, password, confirmPassword} = req.body

    if(password !== confirmPassword){
        res.json({code:401, msg: '비밀번호를 다시 확인해주세요'})
    }else{

        let isAdmin = false 
        if(isDirector){ // 원장이라면 권한 바로 주기
            isAdmin = true
        }

        const teacher = new Teacher({
            name, isDirector, organization, organizationCode,
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