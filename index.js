const express = require('express')
const app = express()
const port = 5000

// DB 연결
const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.MONGODB_URL) // 프로미스
.then(()=> console.log('데이터베이스 연결 성공'))
.catch(err => console.log(`데이터베이스 연결 실패 : ${err}`))

/** 공통 미들웨어 설정 */ 

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // 사용자 인증이 필요한 리소스를 요청할 수 있음
}
const logger = require('morgan')

app.use(cors(corsOptions)) // cors 설정
app.use(logger('tiny')) // 로그 설정
app.use(express.json()) // 파싱
app.use(express.static('public'))
const { isAuth, isAdmin } = require('./auth')
/************************************************************************************* */

const childSchool = require('./src/routes/childSchool')
app.use('/api', childSchool)

const teacher = require('./src/routes/teachers')
app.use('/teacher', teacher)

const uploader = require('./src/routes/uploader')
app.use('/platform', isAuth, isAdmin, uploader)

const downloader = require('./src/routes/downloader')
app.use('/kinder', isAuth, isAdmin, downloader)

const kinder = require('./src/routes/kinder')
app.use('/user', kinder)


// 작동 테스트
app.get('/test', (req, res, next)=>{
    res.json({code: 200, msg : '작동 확인'})
})

// 에러 발생시
app.use((req, res, next) => {
    res.status(404).json({ code: 404, msg: '페이지를 찾을 수 없습니다.'})
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({ code: 500, msg: '서버 에러 발생'})
})

// 서버 연결
app.listen(port, ()=>{
    console.log(`${port}번 연결`)
})