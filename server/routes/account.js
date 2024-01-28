
const express = require('express')
const authMW = require("../middleware/jwtMW");
const {Accountdb} = require("../database/schema");
const mongoose = require("mongoose");
const router = express.Router()

router.get('/balance' , authMW , async (req , res) => {

    const acc = await Accountdb.findOne({
        userid : req.userid
    })

    if (!acc) {
        return res.status(404).send({ msg: 'Account not found' });
    }

    res.status(200).send({
        msg : 'balance fetched successfully',
        balance : acc.balance
    })
})

router.post('/transfer' , authMW , async (req , res) => {

    const session = await mongoose.startSession()

    session.startTransaction()
    const to = req.body.to
    const amount = req.body.amount

    const acc = await Accountdb.findOne({
        userid : req.userid
    })

    if(amount < 0){
        await session.abortTransaction()
        return res.status(400).send({
            msg : "Can't send negative amount"
        })
    }

    if(!acc || acc.balance < amount){
        await session.abortTransaction()
        return res.status(400).send({
            msg : "You are Broke!"
        })
    }

    const toAcc = await Accountdb.findOne({
        userid: to
    }).session(session)

    if(!toAcc){
        await session.abortTransaction()
        return res.status(400).send({
            msg : "This account doesn't exist"
        })
    }

    await Accountdb.updateOne({
        userid : req.userid
    } , {
        $inc : {
            balance: -amount
        }
    }).session(session)

    await Accountdb.updateOne({
        userid : to
    } , {
        $inc : {
            balance: amount
        }
    }).session(session)

    await session.commitTransaction()

    res.status(200).send({
        msg: 'transaction successful',
        transferedAmount : amount
    })
})

module.exports = router
