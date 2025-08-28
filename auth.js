const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./Models/PersonSchema')

passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {

    try {
        const user = await Person.findOne({ username: USERNAME })
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
        }
        const passwordMatched = await user.comparePassword(PASSWORD)
        console.log(passwordMatched);  

        if (passwordMatched) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        }
    } catch (error) {
        console.log(error, "in localStrategy");
        return done('in localStrategy:', error)
    }
}))

module.exports = passport