const expressAsyncHandler = require('express-async-handler')
const { body, check } = require('express-validator')

const isFieldEmpty = (field) => {
    return body(field)
            .notEmpty() // 필드가 비어있지 않다.
            .withMessage(`${field} 부분을 입력해주세요.`)
            .bail() // 끊기
            .trim() // 공백제거
}

const validateUserId = () => {
    return check('userId', 'ID를 입력해주세요')
        .notEmpty()
        .bail()
        .isLength({ min: 2, max: 20 }) //회원명 2~20자
        .withMessage('아이디 : 2자에서 20자 이내로 입력가능합니다.')
        .bail()
        .matches(/[a-zA-Z]/)
        .withMessage('아이디 : 1자 이상의 영문자가 포함되어야 합니다.')
        .matches(/[0-9]/)
        .withMessage('아이디 : 1개 이상의 숫자가 포함되어야 합니다.')
}

// 필수가 아닌 값들의 유효성 검사
const validateUserPhone = () => {
    return body('phone')
            .isMobilePhone()
            .withMessage('올바르지 않은 연락처입니다.')
}
const validateUserEmail = () => {
    return body('email')
            .notEmpty()
            .trim()
            .escape()
            .bail()
            .isEmail()
            .withMessage('이메일 형식이 올바르지 않습니다.')
}

const validateUserPassword = () => {
    return isFieldEmpty('password')
            .isLength({ min: 7 })
            .withMessage('패스워드 : 7자 이상으로 입력해주세요')
            .isLength({ max : 15 })
            .withMessage('패스워드 : 15자 이하로 입력해주세요')
            .bail()
            .matches(/[a-zA-Z]/)
            .withMessage('패스워드 : 1자 이상의 영문자가 포함되어야 합니다.')
            .matches(/[0-9]/)
            .withMessage('패스워드 : 1개 이상의 숫자가 포함되어야 합니다.')
            .matches(/[!@#$%^&*]/)
            .withMessage('패스워드 : 1개 이상의 특수문자가 포함되어야 합니다.')
            .bail()
            .custom((value, {req}) => {
                return req.body.confirmPassword === value
            })
            .withMessage('패스워드가 일치하지 않습니다.')
}

module.exports = ({
    validateUserId,
    validateUserPhone,
    validateUserEmail,
    validateUserPassword,
})