const router = require('express').Router();
const MOE = require('../models/moe.model');
const fetch = require("node-fetch");

router.post('/moe', async (req, res) => {
    try {
        const getMoe = await fetch(`https://api.tomato.gg/dev/api-v2/moe/com`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            let arr = [];

            for (const val in result.data) {
                let newUrl = {};
                newUrl['id'] = result.data[val]["id"];
                newUrl['name'] = result.data[val]["name"];
                newUrl['nation'] = result.data[val]["nation"];
                newUrl['tier'] = result.data[val]["tier"];
                newUrl['65'] = result.data[val]["65"];
                newUrl['85'] = result.data[val]["85"];
                newUrl['95'] = result.data[val]["95"];
                newUrl['100'] = result.data[val]["100"];
                newUrl['type'] = result.data[val]["class"];
                newUrl['icon'] = result.data[val]["image"];
                newUrl['prem'] = result.data[val]["isPrem"];
                arr.push(newUrl);
            }

            return arr;
        }); 

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const newMoe = new MOE({
            date: "" + day + "/" + month + "/" + year,
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
            date: req.query.date,
        });
        res.status(200).json(getMoe);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;