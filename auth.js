const config = require('./config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({ // 토큰 생성 페이로드
        _id: user._id,
        organization : user.organization,
        kinderCode: user.kinderCode,
        name : user.name,
        userId : user.userId,
        createdAt: user.createdAt
    },
    config.JWT_SECRET, // 비밀키
    {
        expiresIn: '1d', // 토큰 만료 기간
        issuer: '푹곡좌'
    }
    )
}

const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization // 요청 헤더의 Authorization
    if(!bearerToken){
        return res.status(401).json({ code: 401, msg: '토큰이 없습니다.'})
    }else{
        const token = bearerToken.slice(7, bearerToken.length)
        jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError'){
                return res.status(419).json({ code: 419, msg: '토큰이 만료되었습니다.'})
            }else if(err){
                return res.status(401).json({ code: 401, msg: '유효한 토큰이 아닙니다.'})
            }
            req.user = userInfo
            next() // 권한이 있는 사용자의 서비스 허용
        })
    }
}

module.exports = {
    generateToken,
    isAuth,
}