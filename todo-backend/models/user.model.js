const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel