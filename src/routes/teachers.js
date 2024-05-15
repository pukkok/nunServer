const express = require('express')
const Teacher = require('../models/Teacher')
const Children = require('../models/Children')
const expressAsyncHandler = require('express-async-handler')

const router = express.Router()

const certificate = (req, res, next) => {

    if(req.body.certificate){
        const {name, organization} = isValid

        req.certificate = {name, organization}
        next()
    }else{
        res.status(404).json({ code: 404, msg: '인증서를 찾을수 없습니다.'})
    }
}

// 교사 회원가입
router.post('/join', 
expressAsyncHandler( async(req, res, next) => {

        const {organization, name} = req.certificate

        const teacher = new Teacher({
            isTeacher : true,
            organization : '',
            name : req.body.name
        })


        teacher.save()
    


}))