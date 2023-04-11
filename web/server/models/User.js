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
    zip: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    applied: [{
        type: String
    }],
    recent: [{
	type: String
    }]
}) 

module.exports = mongoose.model('User', userSchema)
