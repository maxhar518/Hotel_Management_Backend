const express = require('express')
const router = express.Router()
const menu = require('./../Models/menuSchema')


router.get('/', async (req, res) => {
    try {
        const data = await menu.find()
        console.log('Menu Fatched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newdata = new menu(data)
        const response = await newdata.save()
        console.log('Menu Saved');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router