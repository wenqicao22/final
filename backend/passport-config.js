const User = require('./model/user')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if (err) console.error(err)
                if (!user){
                    return done(null, false)
                }else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err){
                            console.error(err)
                        }
                        if (result === true) {
                            return done(null, user)
                        }else {
                            return done(null, false)
                        }
                    })
                    
                }
            })
        })
    )

    //fix bug Cross-Origin Request Blocked by changing the specific user to user._id
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        User.findOne({_id: id}, (err,user) => {
            const userInfo = {
                id: user._id,
                username: user.username,
                managerOrStar: user.managerOrStar
            }
            done(err, userInfo)
        })
    })
}