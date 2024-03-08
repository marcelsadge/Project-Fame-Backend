const mongoose = require('mongoose');

const moeSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: true,
    }}, {
    timestamps: {
        required: true
    }
});

module.exports = mongoose.model('MOE', moeSchema);