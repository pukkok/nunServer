const express = require('express')
const expressAsyncHandler = require('express-async-handler')

const router = express.Router()

router.use('/', expressAsyncHandler( async(req, res, next) => {
    
}))