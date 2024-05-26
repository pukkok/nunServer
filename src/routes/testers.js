const express = require('express')
const Tester = require('../models/Tester')
const expressAsyncHandler = require('express-async-handler')

const router = express.Router()

router.post('/join', 
expressAsyncHandler( async(req, res, next) => {

        const tester = new Tester({
            name : req.body.name,
            email : req.body.email,
            userId : req.body.userId,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        })

        const successs = tester.save()
        if(successs){
            res.json({code : 200, msg: '성공'})
        }else{
            res.json({code : 404, msg: '뭔가 부족해'})
        }

}))



module.exports = router
