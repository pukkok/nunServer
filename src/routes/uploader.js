/* 서버 */
const express = require('express')
const router = express.Router()
const Kinder = require('../models/Kinder')
const expressAsyncHandler = require('express-async-handler')

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

    const kinder = await Kinder.findOne({kinderCode : req.body.kinderCode})

    if(kinder){
        await kinder.updateOne({
            logoPath: req.file.path.slice(7, req.file.path.length)
        })
        await kinder.save()
        res.json({code: 200, msg: '수정이 완료되었습니다.'})
    }else{
        const image = await new Kinder({
            logoPath: req.file.path.slice(7, req.file.path.length)
        })
        const newImage = await image.save()
        res.json({code:200 , newImage})
    }

}))

router.post('/upload/bg', uploadBg.array('bgImgs'), expressAsyncHandler( async(req, res, next) => {
    const kinder = await Kinder.findOne({kinderCode : req.body.kinderCode})
    const imgs = req.files.map(file=>{
        return file.path.slice(7, file.path.length)
    })

    if(kinder){
        await kinder.updateOne({
            bgPath: imgs
        })
        const result = await kinder.save()
        res.json({code: 200, msg: '수정이 완료되었습니다.', result})
    }else{
        const result = await Promise.allSettled(req.files.map((file)=>{
            const image = new Kinder({
                bgPath: file.path.slice(7, file.path.length)
            })
            const newImage = image.save()
            return newImage
        }))
        if(result){
            res.json({code: 200, msg: '추가완료', result })
        }
    }
}))

module.exports = router

// const result = await Promise.allSettled(req.files.map((file)=>{
//     const image = new Image({
//         path: file.path.slice(7, file.path.length)
//     })
//     const newImage = image.save()
//     return newImage
// }))
// res.json({code:200 , result})