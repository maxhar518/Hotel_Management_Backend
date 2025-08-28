const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

PersonSchema.pre('save', async function (next) {

    const person = this    

    if (!person.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(2)
        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword

        next()
    } catch (error) {
        console.log('in pre');
        return next(error)
    }
})

PersonSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        console.log('in comparePassword person schema');
        throw error
    }
}

const Person = mongoose.model('Person', PersonSchema)
module.exports = Person