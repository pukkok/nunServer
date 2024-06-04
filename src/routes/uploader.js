/* 서버 */
const express = require('express')
const router = express.Router()
const Kinder = require('../models/Kinder')
const expressAsyncHandler = require('express-async-handler')

router.post('/newpage', expressAsyncHandler( async(req, res, next) =>{
    console.log('들어옴')
    const oldKinder = await Kinder.findOne({kinderCode : req.user.kinderCode})

    if(oldKinder){
        return res.json({code: 400, msg: '이미 존재하는 페이지입니다.'})
    }

    const newKinder = await new Kinder({
        kinderCode : req.user.kinderCode
    })
    
    if(newKinder){
        newKinder.save()
        res.json({code: 200, msg: '새로운 페이지가 생성되었습니다.'})
    }else{
        res.json({code:400, msg: '페이지 생성에 실패하였습니다.'})
    }
}))

// 이미지 멀터
const multer = require('multer')
const path = require('path')
const imgFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0]
        if(type === 'image'){
            cb(null, true)
        }else{
            cb(null, false)
        }
}
const uploadLogo = multer({
    storage: multer.diskStorage({ //<- 저장소 지정
        destination: function( req, file, cb){ //경로
            cb(null,'public/uploads/logo')
        },
        filename: function(req, file, cb){ // 파일이름
            const ext = path.extname(file.originalname)
            const filename = path.basename(btoa(file.originalname),ext)+'_'+ Date.now() + ext
            cb(null, filename)
        }
    }),
    fileFilter: imgFilter
})
const uploadBg = multer({
    storage: multer.diskStorage({ //<- 저장소 지정
        destination: function( req, file, cb){ //경로
            cb(null,'public/uploads/bg')
        },
        filename: function(req, file, cb){ // 파일이름
            const ext = path.extname(file.originalname)
            const filename = path.basename(btoa(file.originalname),ext)+'_'+ Date.now() + ext
            cb(null, filename)
        }
    }),
    fileFilter: imgFilter
})
// uploadLogo.fields([{name:'logoImg'},{name:'kinderCode'}])
// array - 여러파일 single - 하나파일
router.post('/upload/logo', uploadLogo.single('logoImg'), expressAsyncHandler( async (req,res,next)=>{
    console.log(req.file)// array req.files & single req.file
    
    if(!req.file){ // 
        return res.json({code: 400, msg: '잘못된 이미지 형식입니다.'})
    }

    const kinder = await Kinder.findOne({kinderCode : req.user.kinderCode})

    if(kinder){
        await kinder.updateOne({
            logoPath: req.file.path.slice(7, req.file.path.length)
        })
        await kinder.save()
        res.json({code: 200, msg: '로고 수정이 완료되었습니다.'})
    }else{
        res.json({code:400 , msg: '잘못된 접근입니다.'})
    }

}))

router.post('/upload/bg-list', uploadBg.array('bgImgs'), expressAsyncHandler( async(req, res, next) => {

    const kinder = await Kinder.findOne({kinderCode : req.user.kinderCode})
    const imgs = req.files.map(file=>{
        return file.path.slice(7, file.path.length)
    })

    if(kinder){
        await kinder.updateOne({
            addBgList: imgs
        })
        const result = await kinder.save()
        res.json({code: 200, msg: '새로운 배경 테마 이미지가 추가되었습니다.', result})
    }else{
        res.json({code: 400, msg: '잘못된 접근입니다.' })
    }
}))

module.exports = router

router.post('/upload/data', expressAsyncHandler( async(req, res, next) => {
    const kinder = await Kinder.findOne({kinderCode : req.user.kinderCode})
    const {logoWidth, logoHeight, containerSize, containerUnit} = req.body

    if(kinder){
        kinder.data = {...kinder.data, 
            logoWidth : logoWidth || kinder.data.logoWidth,
            logoHeight : logoHeight || kinder.data.logoHeight, 
            containerSize : containerSize || kinder.data.containerSize,
            containerUnit : containerUnit || kinder.data.containerUnit
        }

        const result = await kinder.save()
        if(result){
            res.json({code: 200, msg: '페이지 데이터 저장완료', result})
        }
    }else{
        res.json({code:400, msg: '유치원 코드가 일치하지 않습니다.'})
    }
}))