const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWTKEY = 'process.env.JWTKEY'

const authMW = (req , res , next) => {
    const headerJWT = req.headers.authorization

    if (!headerJWT || !headerJWT.startsWith('Bearer ')) {
        return res.status(403).send({msg: 'JWT auth error (no bearer)'})
    }

    const token = headerJWT.split(' ')[1]

    try {
        const decodedJWT = jwt.verify(token, JWTKEY)
        req.userid = decodedJWT
        next()
    } catch (err) {
        return res.status(403).send({msg: 'caught error jwt'})
    }

}

module.exports = authMW

