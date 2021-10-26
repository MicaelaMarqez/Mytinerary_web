const mongoose = require ("mongoose")

const citySchema = new mongoose.Schema({
    city: {type: String, require: true},
    country: {type: String, require: true},
    srcCard: {type: String, require: true},
    srcHeader: {type: String, require: true},
    popular: {type: Boolean, default: false}
})

const City = mongoose.model ("city", citySchema)

module.exports = City