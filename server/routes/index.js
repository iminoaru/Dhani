const express = require('express')
const userRouter = require('./user')
const accRouter = require('./account')

const router = express.Router()

router.use('/user' , userRouter)
router.use('/account' , accRouter)

module.exports = router