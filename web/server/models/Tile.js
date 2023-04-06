// Praneeth O - Feb 2023

const mongoose = require('mongoose')

// Unique ids for each tile determined by _id
const tileSchema = new mongoose.Schema({
    club: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    // applied contains usernames of the people who applied
    // When a user applies, their username is added to this array
    // Also when a user applies, there should be a copy of the tile id in their user document
    applied: [{
        type: String
    }]
});