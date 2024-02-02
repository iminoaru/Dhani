const express = require('express')
const { signupZod , loginZod, updateZod} = require('../zod/types')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWTKEY = process.env.JWTKEY
const router = express.Router()
const { ObjectId } = require('mongodb');
const { Userdb, Accountdb} = require('../database/schema')
const authMW = require("../middleware/jwtMW");
router.post('/signup' , async (req , res) => {
    const goodData = signupZod.safeParse(req.body)
    if(!goodData.success){
        res.status(400).send({msg : 'input seems wrong'})
        return
    }

    const checkNewUser = await Userdb.findOne({
        email: req.body.email
    })
    if(checkNewUser){
        res.status(411).send({msg : 'email already registered'})
        return
    }

    const newUser = await Userdb.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password
    })

    const userid = newUser._id.toString()

    const giveBalance = await Accountdb.create({
        userid : userid,
        balance : 8000
    })

    if(!giveBalance){
        res.status(411).send({msg : 'error in assigning initial balance'})
        return
    }

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
        return
    }

    const userFound = await Userdb.findOne({
        email : req.body.email
    })

    if(!userFound){
        res.status(401).send({msg : 'email not registered'})
        return
    }

    if((userFound.password !== req.body.password) ){
        res.status(401).send({msg : 'incorrect password'})
        return
    }


    const userid = userFound._id.toString()

    const token = jwt.sign( userid , JWTKEY)

    res.status(200).send({
        msg : 'login successful',
        token : token
    })
})

router.put('/update' , authMW , async (req , res) => {
    const goodData = updateZod.safeParse(req.body)

    if(!goodData){
        res.status(411).send({msg : 'invalid inputs'})
    }

    const updateUser = await Userdb.updateOne({
        _id : new ObjectId(req.userid)
    }, req.body)

    if(!updateUser){
        res.status(411).send({msg : 'unable to update'})
    }

    res.status(200).send({msg : 'updated successfully'})
})

router.get('/friends' , authMW , async (req , res) => {
    const filter = req.query.search || ''
    const loggedInUserId = new ObjectId(req.userid)

    const filteredUser = await Userdb.find({
        $and: [
            {
                _id: { $ne: loggedInUserId } // Exclude the logged-in user
            },
            {
                $or: [
                    { firstname: { "$regex": filter } },
                    { lastname: { "$regex": filter } }
                ]
            }
        ]
    })

    res.status(200).send({
        msg : 'successfully filtered',
        filteredUsers : filteredUser.map((filteredUsers) => ({
            email: filteredUsers.email,
            firstname : filteredUsers.firstname,
            lastname : filteredUsers.lastname,
            _id : filteredUsers._id.toString()
        }))
    })
})

module.exports = router