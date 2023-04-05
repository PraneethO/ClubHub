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

    const {username, password, grade, zip, role, industry} = req.body
    // Confirm Data
    if((username === null) || (password === null) || (grade === null) || (zip === null) || (role === null) || (industry === null)) {
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
    const newUser = new User({username, password: hashedPwd, role: role, zip: zip, grade: grade, industry: industry});
    newUser.save()
        .then((result) => {
            const newSession = new Session({sessionId, userId: username, expires: expiryDate});
            newSession.save();
            
            res.status(201).json({message: "New user ${username} created"});
        })
        .catch(error => res.status(500).json({message: "Internal server error"}));
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {id, username, roles, active, password} = req.body
    
    // Confirm Data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: "User Not Found"})
    }

    const duplicate = await User.findOne({username}).lean().exec()
    // Allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate Username"})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // HASH
        user.passwoed = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message:'User ID Required'})
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({message: "User not found"})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    createNewUser,
    updateUser,
    deleteUser
}