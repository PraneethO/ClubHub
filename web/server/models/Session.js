const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    expires: { type: Date, required: true },
})

module.exports = mongoose.model('Session', sessionSchema)