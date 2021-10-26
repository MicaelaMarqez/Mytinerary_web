const City = require("../models/City")

const citiesControllers = {
    getCities:(req,res) => {
        City.find()
        .then((cities) => {
            if(cities){
                cities.sort((a, b) => {
                    if (a.city > b.city) {
                        return 1;
                    }
                    if (a.city < b.city) {
                        return -1;
                    }
                    return 0;
                    })
                res.json({success: true, response: cities})
            } else {
                throw new Error ()
            }
        })
        .catch(() => res.json({success: false}))
    },
    getCity:(req,res) => {
        City.findOne({_id: req.params.id})
        .then((wantedCity) => {
            if(wantedCity!==null){
                res.json({success: true, response: wantedCity})
            } else {
                throw new Error ()
            }
        })
        .catch(() => res.json({success: false}))
    },
    pushCity:(req, res) => {
        const saveCity = new City({
            city: req.body.city,
            country: req.body.country,
            srcCard: req.body.srcCard,
            srcHeader: req.body.srcHeader
        })
        saveCity.save()
        .then(() => res.json({success: true, resonse: saveCity}))
        .catch(error => res.json({success: false, error}))
    },
    deleteCities:(req, res) => {
        City.findOneAndDelete({_id: req.params.id})
        .then(() => res.json({ success: true}))
        .catch((error) => res.json({success:false, response: error}))
    },
    editCity: (req, res) => {
        City.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then((toEdit) => {
            if(toEdit){
            res.json({success: true})
            } else {
                throw new Error ("id does not match")
            }
        })
        .catch((error) => res.json({success: false, response: error.message}))
    },
    getPopular: (req, res) => {
        City.find({popular: true})
        .then((popularCities) => {
            if(popularCities.length === 12){
                res.json({success: true, response: popularCities})
            } else {
                throw new Error ("12 popular cities are needed to display the carousel")
            }
        })
        .catch((error) => res.json({success: false, response: error.message}))
    }
}

module.exports = citiesControllers