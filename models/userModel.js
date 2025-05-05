const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add the username"]
    },
    email: {
        type: String,
        required: [true,"Please add the email"]
    },
    password: {
        type: String,
        required: [true,"Please add the password"]
    },
}, {
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema);