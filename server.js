const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const personRouter = require('./Routes/Person')
const menuRouter = require('./Routes/menuRoutes')
const bodyparser = require('body-parser')
app.use(bodyparser.json())


app.get('/', (req, res) => {
    res.status(200).json('Listening')
})

app.use('/person', personRouter)
app.use('/menu', menuRouter)

app.listen(process.env.PORT, () => {
    console.log('Listening at 3000');

})