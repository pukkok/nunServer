const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const axios = require('axios')
const config = require('../../config')

const router = express.Router()

const BASE_URL = config.CHILDSCHOOL_BASE_URL
const key = config.CHILDSCHOOL_API_KEY

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