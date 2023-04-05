const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    name: {
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
    type: {
        type: Number,
        required: true
    }
}) 

module.exports = mongoose.model('Club', clubSchema)