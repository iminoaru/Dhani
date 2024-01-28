const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }

});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Accountdb = mongoose.model('Account', accountSchema);
const Userdb = mongoose.model('User', userSchema);

module.exports = {
    Userdb,
    Accountdb
};