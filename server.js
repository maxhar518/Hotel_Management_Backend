require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')

const personRouter = require('./Routes/PersonRoutes')
const menuRouter = require('./Routes/menuRoutes')
const passport = require('./auth')
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res) => {
    res.status(200).json('Listening')
})


app.use('/person', localAuthMiddleware, personRouter)
app.use('/menu', localAuthMiddleware, menuRouter)

app.listen(process.env.PORT, () => {
    console.log('Listening at 3000');

})