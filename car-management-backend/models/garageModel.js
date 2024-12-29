const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    capacity: { type: Number, required: true }
});

module.exports = mongoose.model('Service', ServiceSchema);
