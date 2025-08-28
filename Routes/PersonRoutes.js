const express = require('express')
const router = express.Router()
const Person = require('../Models/PersonSchema')

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('Person Data Fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('Person Data saved');
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const data = await Person.find({ work: worktype })
            console.log('Worktype Fatched');
            res.status(200).json(data)
        } else {
            res.send(404).json('Invalid Worktype')
        }
    } catch (error) {
        console.log(error);
        res.send(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        personId = req.params.id
        personData = req.body
        const response = await Person.findByIdAndUpdate(personId, personData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json('Person Not Found')
        }
        console.log('Person Data Updated');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            console.log("Peson Not found");
        }
        const data = await Person.findByIdAndDelete(id)
        console.log('Person Data Deleted');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router