const express = require('express')
const { signupZod , loginZod } = require('../zod/types')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWTKEY = process.env.JWTKEY
const router = express.Router()
const { Userdb } = require('../database/schema')
router.post('/signup' , async (req , res) => {
    const goodData = signupZod.safeParse(req.body)
    if(!goodData){
        res.status(411).send({msg : 'input seems wrong'})
    }

    const checkNewUser = await Userdb.findOne({
        email: req.body.email
    })
    if(checkNewUser){
        res.status(411).send({msg : 'email already registered'})
    }

    const newUser = await Userdb.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password
    })

    const userid = newUser._id

    const token = jwt.sign( userid , JWTKEY )

    res.status(200).send({
        msg : 'signup successful',
        token : token
    })
})

router.post('/login' , async (req , res) => {
    const goodData = loginZod.safeParse(req.body)

    if(!goodData){
        res.status(411).send({msg : 'invalid input'})
    }

    const userFound = await Userdb.findOne({
        email : req.body.email,
        password: req.body.password
    })

    if(!userFound){
        res.status(411).send({msg : 'email not registered'})
    }

    const userid = userFound._id

    const token = jwt.sign( userid , JWTKEY)

    res.status(200).send({
        msg : 'login successful',
        token : token
    })
})

module.exports = router