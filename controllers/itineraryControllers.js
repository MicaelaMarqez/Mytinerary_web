const Itinerary = require("../models/Itinerary")

const itinerariesControllers = {
    getItineraries: (req, res) => {
        Itinerary.find().populate({path:"cityId", select:"city"})
        .then(itineraries => {
            if(itineraries){
            res.json({success:true, response: itineraries})
            } else {
                throw new Error ("Itinerary not found")
            }
        })
        .catch((error) => res.json({success: false}))
    },
    pushItinerary: (req, res) => {
        const saveItinerary = new Itinerary({
            userName: req.body.userName,
            userPhoto: req.body.userPhoto,
            tittle: req.body.tittle,
            price: req.body.price,
            duration: req.body.duration,
            hastags: req.body.hastags,
            comentaries: req.body.comentaries,
            cityId: req.body.cityId
        })
        saveItinerary.save()
        .then(() => res.json({success: true}))
        .catch(error => res.json({success: false, error: error.message}))
    },
    getItinerriesByCity: (req, res) => {
        Itinerary.find({cityId: req.params.idCity}).populate({path:"comentaries.userId", select:"profilePicture userName"})
        .then(itineraries => res.json({success:true, response: itineraries}))
        .catch(() => res.json({success: false}))
    },
    deleteItinerary: (req, res) => {
        Itinerary.findOneAndDelete({_id: req.params.id})
        .then((toDelete) => {
            if(toDelete===null){
                throw new Error ("Cannot found the itinerary")
            } else {
                res.json({success: true})
            }
        })
        .catch((error) => res.json({success:false, response: error}))
    },
    editItinerary: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then((toDelete) => {
            if(toDelete){
                res.json({success: true})
            } else {
                throw new Error ("id does not match")
            }
        })
        .catch((error) => res.json({success: false, response: error.message}))
    },
    getItinerary: (req, res) => {
        Itinerary.findOne({_id: req.params.id})
        .then((wantedItinerary) => {
            if(wantedItinerary !== null){
                res.json({success: true, response: wantedItinerary})
            } else {
                throw new Error ("The itinerary cannot be found")
            }
        })
        .catch((error) => res.json({success: false, response: error.message}))
    },
    likeOperator: (req, res) => {
        let operator = req.body.likeState ? {$push: {likesEdit: req.body.userId}} : {$pull: {likesEdit: req.body.userId}}
            Itinerary.findOneAndUpdate({_id: req.params.id}, operator, { new: true})
            .then((itineraryEdit) => {
                if(itineraryEdit){
                    res.json({success: true, response: itineraryEdit.likesEdit})
                } else {
                    throw new Error ("id does not match")
                }
            })
            .catch((error) => res.json({success: false, response: error.message}))
    },
    sendComent: (req, res) => {
            Itinerary.findOneAndUpdate({_id: req.params.itId}, {$push: {comentaries: req.body.object}},
                {new: true}).populate({path:"comentaries.userId", select:"profilePicture userName"})
            .then((toSend) => {
                if(toSend){
                    res.json({success: true, response: toSend.comentaries})
                } else {
                    throw new Error ("id does not match")
                }
            })
            .catch((error) => res.json({success: false, response: error.message}))
    },
    deleteComment: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.itId}, {$pull: {comentaries:{_id: req.body.commentId}}},
            {new: true}).populate({path:"comentaries.userId", select:"profilePicture userName"})
        .then((toDelete) => {
            if(toDelete){
                res.json({success: true, response: toDelete.comentaries})
            } else {
                throw new Error ("id does not match")
            }
        })
        .catch((error) => res.json({success: false, response: error.message}))
    },
    editComment: (req, res) => {
        Itinerary.findOneAndUpdate({"comentaries._id": req.params.cmId}, {$set: {"comentaries.$.comment": req.body.editComment}},
        {new:true}).populate({path:"comentaries.userId", select:"profilePicture userName"})
            .then((toEdit) => {
                console.log(toEdit.comentaries)
                if(toEdit){
                    res.json({success: true, response: toEdit.comentaries})
                } else {
                    throw new Error ("id does not match")
                }
            })
            .catch((error) => res.json({success: false, response: error.message}))
    }
}

module.exports = itinerariesControllers