const mongoose = require('mongoose')
const Certificate = require('./src/models/Certificate')
const config = require('./config')

const certificates = []

const selectRN = (n) => {
    return Math.floor(Math.random()*n)
}

const firstName = [
    '김','이','박','염','용',
    '서','강','최','진','임',
    '유','황','윤','조','변',
    '송','연','오','전','정',
    '차','한','권'
]
const lastName = [
    '문주','민석','정원','건우','준호',
    '주현','세준','준범','진우','세호',
    '시현','미애','민','민혁','원구',
    '현','상훈','은수','다윗','인모',
    '다빈','현우','용범','인환','승현',
    '연욱','경훈','예은','성용','기영',
    '민서','서영','인섭','정한','정환',
    '치성','태민','희경','동규','철민',
    '수연','수정','주경','태영','광희'
]

const keys = [
    'keyA', 'keyB', 'keyC', 'keyD'
]

const passwords = [
    'passwordA', 'passwordB', 'passwordC', 'passwordD'
]

const organization = [
    {name : '미르유치원', code : "1ecec08c-f192-b044-e053-0a32095ab044"},
    {name : '한나유치원', code : "1ecec08c-eec6-b044-e053-0a32095ab044"}
]

const director = [true, false]

mongoose.connect(config.MONGODB_URL)
.then(()=> console.log('연결 완료'))
.catch(err => console.log({'연결 실패' : err}))

const createCertificate = async (n, certificates) => {
    console.log('인증서 만드는 중')
    for(let i=0; i<n; i++){
        let director = false
        let selectOrganization = organization[selectRN(organization.length)]

        if(i===0) director = true
        const certificate = new Certificate({
            key: keys[i],
            password: passwords[i],
            name : firstName[selectRN(firstName.length)] + lastName[selectRN(lastName.length)],
            organization : selectOrganization.name,
            organizationCode : selectOrganization.code,
            isDirector: director,
        })
        certificates.push(await certificate.save())
    }
    return certificates
}

const buildData = async (certificates) => {
    certificates = await createCertificate(4, certificates)
}

buildData(certificates)

// const password = [
//     'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'
// ]