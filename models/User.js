const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    userName: {type: String, require: true},
    userLastName: {type: String, require: true},
    userMail: {type: String, require: true},
    profilePicture: {type: String, require: true},
    password: {type: String, require:true},
    country: {type: String, require: true},
    administrator: {type: Boolean, default: false},
    google: {type: Boolean}
})

const User = mongoose.model ("user", userSchema)

module.exports = User