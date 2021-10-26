const passport = require("passport")
const jwtStraegy = require ("passport-jwt").Strategy
const extractJws = require ("passport-jwt").ExtractJwt
const User = require ("../models/User")

module.exports = passport.use(
    new jwtStraegy ({
        jwtFromRequest: extractJws.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKENKEY,
    }, (payload, done) => {
        User.findOne({_id: payload._doc._id})
        .then((res) => {
            if(res){
                console.log("pasa")
                return done(null, res)
            } else {
                console.log("no pasa")
                return done(null,false)
            }
        })
        .catch((error) => done(error, false))
    })
)