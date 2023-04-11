const Club = require('../models/Club')
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

// @desc Creates new club
// @route POST /clubs
// @access Private
const createNewClub = asyncHandler(async (req, res) => {
    const SESSION_EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000;

    const {username, password, zip, industry, school, leaders} = req.body
    // Confirm Data
    if(!username || !password || !zip || !industry || !school || !leaders) {
        return res.status(400).json({message: 'All fields are required'})
    }

    // Check for Duplicate
    const duplicate = await Club.findOne({username: username, zip: zip}).lean().exec()
    if (duplicate) {
        return res.status(409).json({message: 'Duplicate'})
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
    const newClub = new Club({username: username, password: hashedPwd, zip: zip, industry: industry, school: school, leaders: leaders});
    newClub.save()
        .then((result) => {
            const newSession = new Session({sessionId, username: username, expires: expiryDate});
            newSession.save();
            
            res.status(201).json({message: "New club created"});
        })
        .catch(error => res.status(500).json({message: "Internal server error"}));
})


module.exports = {
    createNewClub,
}