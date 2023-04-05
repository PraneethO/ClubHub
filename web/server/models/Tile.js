const mongoose = require('mongoose')

const tileSchema = new mongoose.Schema({
    club: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    description: {

});