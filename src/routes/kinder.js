const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const axios = require('axios')
const config = require('../../config')

const router = express.Router()

const allData = require('../datas/allData')

const BASE_URL = `https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do`
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 // 인증서 유효성 검증안함
const key = config.OPEN_API_KEY

router.post('/kinder', expressAsyncHandler( async(req, res, next) => {
    const {sidoCode, sggCode, pageCnt, currentPage} = req.body
    const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${sggCode}`
    // &currentPage=${currentPage}&pageCnt=${20}
    const { data } = await axios.get(url)
    if(data.kinderInfo){
        res.json(data.kinderInfo)
    }else{
        res.json('파일이 없습니다.')
    }
}))

module.exports = router