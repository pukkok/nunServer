const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const axios = require('axios')

const router = express.Router()

const allData = require('../datas/allData')

const BASE_URL = `https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do`
const key = process.env.CHILDSCHOOL_OPENAPI_KEY

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 // 인증서 유효성 검증안함
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

// router.get('/kinder/all', expressAsyncHandler( async(req, res, next) => {
//     let result = []
//     const success = await Promise.all(
//         allData.map(async item => {
//             const {sidoCode, code} = item
//             const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${code}`
//             const { data } = await axios.get(url)
//             return result.push(...data.kinderInfo)
//         })
//     )
    
//     if(success){
//         res.json(result)
//     }else{
//         res.json('작동 불가')
//     }
// }))

router.get('/kinder/all', expressAsyncHandler( async(req, res, next) => {
    const success = await Promise.all(
        allData.map(async  item => {
            const {sidoCode, code} = item
            const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${code}`
            const { data } = await axios.get(url)
            return data 
        })
    )

    if(success){
        res.json(success.reduce((acc, r) => acc.concat(r.kinderInfo), []))
    }else{
        res.json('작동 불가')
    }
}))

module.exports = router