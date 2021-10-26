const User = require ("../models/User")
const bcryptjs = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const userControllers = {
    createUser: (req, res) => {
        console.log("INGRESA AL CONTROLADOR")
        const {userName, userLastName, userMail, profilePicture, password, country, google} = req.body
        let hashedPass = bcryptjs.hashSync(password)
        const user = new User ({
            userName,
            userLastName,
            userMail,
            profilePicture,
            password: hashedPass,
            country,
            google
        })
        User.findOne({userMail: userMail})
        .then((userExist) => {
            if(userExist){
                res.json({success: false, response:null, error: "Mail already in use"})
            } else {
                user.save()
                .then(() => {
                    res.json({success: true, response: user.userName, error: null})
                })//no va a caer porque si llegó va a andar
                .catch(() => res.json({success: false, response:null, error: "Something is wrong, please try again later"}))
            }
        })
        .catch(() => res.json({success: false, response: null, error: "Something is wrong, please try again later"}))
    },
    getCountries: (req, res) => {
        fetch("https://restcountries.eu/rest/v2/#")
        .then(res => res.json())
        .then(() => res.json({succes:true}))
    },
    loguin:(req, res) => {
        const {userMail, password, logGoogle} = req.body
        User.findOne({userMail: userMail})
        .then(userExist => {
            if(!userExist){
                res.json({success: false, response: "Mail and/or passport incorrect"})
            }
            if(userExist.google && !logGoogle){
                res.json({success: false, response: "You created your account with Google, please log in with them"})
            }
            if(bcryptjs.compareSync(password, userExist.password)){
                const token = jwt.sign({...userExist}, process.env.TOKENKEY)
                res.json({success: true, response: {userName: userExist.userName, profilePicture: userExist.profilePicture, token: token, userId: userExist._id}})
            } else {
                res.json({success: false, response: "Mail and/or passport incorrect"})
            }
        })
        .catch(() => res.json({success: false, response: "Something is wrong, please try again later"}))
    },
    verifytoken: (req, res) => {
        res.json({userId: req.user._id,userName: req.user.userName, profilePicture: req.user.profilePicture})
    }
}

module.exports = userControllers