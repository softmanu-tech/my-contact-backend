const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require('../models/userModel');
//@desc Register the user
//@route POST /api/users/register
//@access Public
const registerUser =  asyncHandler( async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please provide all the fields");
    }
    const UserAvailable = await User.findOne({email})
    if(UserAvailable){
        res.status(400);
        throw new Error("User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    console.log(`User ${user.username} registered`);
    if (user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    res.json({message: "REgister the User"})
})
//@desc Login the user
//@route POST /api/users/login
//@access Public
const loginUser =  asyncHandler( async (req, res) =>{
    res.json({message: "Login the User"})
})
//@desc Current User
//@route GET /api/users/current
//@access Private
const currentUser =  asyncHandler( async (req, res) =>{
    res.json({message: "Get the current User"})
})
module.exports = {
    registerUser,
    loginUser,
    currentUser
}