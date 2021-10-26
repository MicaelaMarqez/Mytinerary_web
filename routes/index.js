const express = require("express")
const passport = require("passport")
const citiesControllers = require("../controllers/citiescontrollers")
const itinerariesControllers = require("../controllers/itineraryControllers")
const userControllers = require("../controllers/userControllers")
const activitiesControllers = require("../controllers/activitiesControllers")
const validator = require("../controllers/validator")
const router = express.Router()

router.route("/cities")
.get(citiesControllers.getCities)

router.route("/cities/:id")
.delete(citiesControllers.deleteCities)

router.route("/city/:id")
.get(citiesControllers.getCity)
.put(citiesControllers.editCity)

router.route("/form")
.post(citiesControllers.pushCity)

router.route("/popular")
.get(citiesControllers.getPopular)

router.route("/itineraries")
.get(itinerariesControllers.getItineraries)
.post(itinerariesControllers.pushItinerary)

router.route("/itineraries/:idCity")
.get(itinerariesControllers.getItinerriesByCity)

router.route("/itinerary/:id")
.get(itinerariesControllers.getItinerary)
.delete(itinerariesControllers.deleteItinerary)
.put(itinerariesControllers.editItinerary)

router.route("/itinerary/like/:id")
.put(
    passport.authenticate("jwt", {session: false}),
    itinerariesControllers.likeOperator)

router.route("/sign_up")
.post(validator, userControllers.createUser)

router.route("/countries")
.get(userControllers.getCountries)

router.route("/sign_in")
.post(userControllers.loguin)

router.route("/verify_token")
.get(
    passport.authenticate("jwt", {session: false}),
    userControllers.verifytoken)

router.route("/activities/:idIt")
.get(activitiesControllers.getActivityByIt)

router.route("/activities")
.post(activitiesControllers.pushActivities)
.get(activitiesControllers.getActivities)

router.route("/itinerary/send_comment/:itId")
.put(passport.authenticate("jwt", {session: false}),
    itinerariesControllers.sendComent)

router.route("/itinerary/delete_comment/:itId")
.put(passport.authenticate("jwt", {session: false}),
    itinerariesControllers.deleteComment)

router.route("/itinerary/edit_comment/:cmId")
.put(passport.authenticate("jwt", {session: false}),
itinerariesControllers.editComment)

module.exports = router