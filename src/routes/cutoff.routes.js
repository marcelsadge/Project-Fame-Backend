const router = require('express').Router();
const Cutoff = require('../models/cutoff.models');
const fetch = require("node-fetch");

const api_key = 'a1ade2adb0a147e81c3115c498bbb1c7';
const event_id = 'we_2023';
const front_id = 'we_2023_bg';

const getFameCutoff = async (cutoff) => {
    const page = Math.ceil(cutoff / 100);
    const fameCutoffPage = await fetch(`https://api.worldoftanks.com/wot/globalmap/eventaccountratings/?application_id=${api_key}&event_id=${event_id}&front_id=${front_id}&limit=100&page_no=${page}`, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result.data);
        return result.data;
    });
    let prev = {};
    for (const elem in fameCutoffPage) {
        if (fameCutoffPage[elem]["award_level"] > cutoff) {
            console.log( prev["fame_points"]);
            return [prev["fame_points"], prev["updated_at"], prev["event_id"]];
        }
        prev = fameCutoffPage[elem];
    }
    return "";
}

router.post('/cutoff', async (req, res) => {
    try {
        const fameCutoff = await getFameCutoff(2250);
  
        const newCutoff = new Cutoff({
            season: fameCutoff[2],
            fame_cutoff : fameCutoff[0],
            last_updated: fameCutoff[1],
        });
        const saveCutoff = await newCutoff.save();
        res.status(200).json(saveCutoff);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/cutoff', async (req, res) => {
    try {
        const getCutoff = await Cutoff.find({
            season: req.body.season
        });
        res.status(200).json(getCutoff);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;