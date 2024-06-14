const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const axios = require('axios')
const config = require('../../config')

const router = express.Router()

const BASE_URL = config.CHILDSCHOOL_BASE_URL
const key = config.CHILDSCHOOL_API_KEY

const sggData = require('../datas/sggData')

router.get('/allKinder', expressAsyncHandler( async(req, res, next) => {
    
    const success = await Promise.all(
        sggData.map( item => {
            const {sidoCode, code : sggCode } = item
            const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${sggCode}`
            return axios.get(url)
        })
    )
    if(success){
        const flat = await success.reduce((acc, r)=>acc.concat(r.data), [])
        res.json({code: 200, flat})
    }

}))

async function axiosKinderAllData (allData, setFunc) {
    const success = await Promise.all(
        allData.map( item => {
            const {sidoCode, code} = item
            return axios.post('/api/kinder', {
                sidoCode, sggCode : code
            })
        })
    )
    const flat = await success.reduce((acc, r)=>acc.concat(r.data), [])
    return setFunc(flat)

}





router.post('/kinder', expressAsyncHandler( async(req, res, next) => {
    const {sidoCode, sggCode} = req.body
    const url = `${BASE_URL}?key=${key}&sidoCode=${sidoCode}&sggCode=${sggCode}`

    const { data } = await axios.get(url)
    if(data.kinderInfo){
        res.json(data.kinderInfo)
    }else{
        res.status(404).json({code : 404, msg : '파일이 없습니다.'})
    }
}))

module.exports = router