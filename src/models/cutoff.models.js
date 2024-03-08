const mongoose = require('mongoose');

const cutoffSchema = new mongoose.Schema({
    season: {
        type: String,
    },
    fame_cutoff: {
        type: Number,
    },
    last_updated: {
        type: Number,
    }}, {
    timestamps: {
        required: true
    }
});

module.exports = mongoose.model('Cutoff', cutoffSchema);