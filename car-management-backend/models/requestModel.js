const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Request', RequestSchema);
