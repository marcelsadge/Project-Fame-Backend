const mongoose = require('mongoose');

const moeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    }}, {
    timestamps: {
        required: true
    }
});

module.exports = mongoose.model('MOE', moeSchema);