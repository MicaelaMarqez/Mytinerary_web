const mongoose = require ("mongoose")

const itinerarySchema = new mongoose.Schema({
    userName: {type: String, require: true},
    userPhoto: {type: String, require: true},
    tittle: {type: String, require: true},
    price: {type: Number, require: true},
    duration: {type: Number, require: true},
    likes: {type: Number, default: 0},
    hastags: {type:Array, require: true},
    comentaries:[{comment: {type: String}, userId: {type: mongoose.Types.ObjectId, ref: "user"}}],
    likesEdit:{type: Array},
    cityId: {type: mongoose.Types.ObjectId, ref: "city"}
})

const Itinerary = mongoose.model ("itinerary", itinerarySchema)

module.exports = Itinerary