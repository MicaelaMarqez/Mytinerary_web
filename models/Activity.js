const mongoose = require ("mongoose")

const activitiesSchema = new mongoose.Schema({
    activity: {type:String, require:true},
    picture: {type:String, require:true},
    itineraryId: {type: mongoose.Types.ObjectId, ref: "itinerary"}
})

const Activity = mongoose.model ("activity", activitiesSchema)

module.exports = Activity