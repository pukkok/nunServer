const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const axios = require('axios')

const router = express.Router()

router.post('/kinder', expressAsyncHandler( async(req, res, next) => {
    const {sidoCode, sggCode} = req.body
    const BASE_URL = `https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do`
    const key = process.env.CHILDSCHOOL_OPENAPI_KEY
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 // 인증서 유효성 검증안함

    const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${sggCode}`
    const { data } = await axios.get(url)
    if(data.kinderInfo){
        res.json(data.kinderInfo)
    }else{
        res.json('파일이 없습니다.')
    }
}))

module.exports = router