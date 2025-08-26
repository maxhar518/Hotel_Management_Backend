const mongoose = require('mongoose')
const url = process.env.DB_URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('connected', () => {
    console.log('DB connected');
})
db.on('error', (error) => {
    console.log('DB error', error);
})
db.on('disconnected', () => {
    console.log('DB disconnected');

})

module.exports = db

