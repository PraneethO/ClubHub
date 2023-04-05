const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Student is True, Company is False
    role: {
        type: Boolean,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    industry: {
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('User', userSchema)