const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    CHILDSCHOOL_API_KEY : process.env.CHILDSCHOOL_OPENAPI_KEY,
    CHILDSCHOOL_BASE_URL : process.env.CHILDSCHOOL_BASE_URL
}