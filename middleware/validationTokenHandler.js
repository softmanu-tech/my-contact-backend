const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const constants = require('../constants');
//@desc Validate the token
//@route GET /api/users/current
//@access Private
const validateToken =  asyncHandler( async (req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization|| req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(constants.UNAUTHORIZED);
                throw new Error("Invalid Token");
            }
            console.log(decoded);
            req.user = decode.user;
            next();
        });

        if(!token){
            res.status(constants.UNAUTHORIZED);
            throw new Error("Invalid Token");
        }
    }
  
    
})
module.exports = validateToken;  