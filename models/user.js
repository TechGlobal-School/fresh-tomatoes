const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
},{timestamps: true});

// userSchema.pre('save', function(next) {
//         // encrypt users password
//         const user = this;
//     // check if user password not modified
//     if(!user.isModified('password')) return next();

//     bcrypt.getSalt(10, function(err, salt) {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             user.password = hash;
//             next();
//         })
//     })
// });

const User = mongoose.model("User",userSchema );
module.exports = User;