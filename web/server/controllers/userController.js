const User = require('../models/User')
const Session = require('../models/Session')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

function generateSessionId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sessionId = '';
    for (let i = 0; i < 32; i++) {
      sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return sessionId;
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const SESSION_EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000;

    const {username, password, grade, zip} = req.body
    // Confirm Data
    if(!username || !password || !zip || !grade) {
        return res.status(400).json({message: 'All fields are required'})
    }

    // Check for Duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate) {
        return res.status(409).json({message: 'Duplicate username'})
    }
    
    const hashedPwd = await bcrypt.hash(password, 10) // Password Hash

    const sessionId = generateSessionId();
    const expiryDate = new Date(Date.now() + SESSION_EXPIRY_TIME);

    res.cookie('sessionId', sessionId, {
        expires: expiryDate,
        httpOnly: true,
        sameSite: 'strict'
    });

    // Create and Store User
    const newUser = new User({username, password: hashedPwd, zip: zip, grade: grade});
    newUser.save()
        .then((result) => {
            const newSession = new Session({sessionId, username: username, expires: expiryDate});
            newSession.save();
            
            res.status(201).json({message: "New user ${username} created"});
        })
        .catch(error => res.status(500).json({message: "Internal server error"}));
})


module.exports = {
    createNewUser,
}