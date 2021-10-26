const Activity = require("../models/Activity")

const activitiesControllers = {
    pushActivities:(req, res) => {
        const saveActivity = new Activity({
            activity: req.body.activity,
            picture: req.body.picture,
            itineraryId: req.body.itineraryId
        })
        saveActivity.save()
        .then(() => res.json({success: true}))
        .catch(error => res.json({success: false, error}))
    },
    getActivityByIt: (req, res) => {
        Activity.find({itineraryId: req.params.idIt})
        .then(activities => res.json({success:true, response: activities}))
        .catch(() => res.json({success: false}))
    },
    getActivities: (req, res) => {
        Activity.find()
        .then(activities => res.json({success:true, response: activities}))
        .catch(() => res.json({success: false}))
    }
}

module.exports = activitiesControllers