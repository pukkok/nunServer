const exress = require('express')
const expressAsyncHandler = require('express-async-handler')

const allergies = require('../datas/allergies')

const router = exress.Router()

router.post('/allergy', expressAsyncHandler( async(req, res, next) =>{

}))

// 작성자, 알레르기표, 유치원코드