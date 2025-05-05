const asyncHandler = require("express-async-handler");
//@desc Register the user
//@route POST /api/users/register
//@access Public
const registerUser =  asyncHandler( async (req, res) => {
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