const router = require('express').Router();
const MOE = require('../models/moe.model');
const fetch = require("node-fetch");

router.post('/moe', async (req, res) => {
    const getMoe = await fetch(`https://poliroid.me/gunmarks/api/com/vehicles/20,30,40,50,55,60,65,70,75,80,85,90,95,100`, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result.data);
        return result.data;
    });
    try {
        const newMoe = new MOE({
            data: getMoe,
        });
        const saveMoe = await newMoe.save();
        res.status(200).json(saveMoe);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/newmoe', async (req, res) => {
    try {
        const newMoe = new MOE({
            id: 2,
            data: ['hello'],
        });
        const saveMoe = await newMoe.save();
        res.status(200).json(saveMoe);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/moe', async (req, res) => {
    try {
        const getMoe = await MOE.find({
            id: req.query.id,
        });
        res.status(200).json(getMoe);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;