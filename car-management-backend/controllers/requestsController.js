const Request = require('../models/Request');
const Service = require('../models/Service');

// Създаване на заявка за поддръжка
exports.createRequest = async (req, res) => {
    try {
        const { car, service, date } = req.body;

        // Проверка за налични свободни места в сервиза
        const serviceObj = await Service.findById(service);
        if (!serviceObj) {
            return res.status(404).send({ message: 'Service not found' });
        }

        const existingRequest = await Request.findOne({ service, date });
        if (existingRequest) {
            return res.status(400).send({ message: 'No free slots available for this date' });
        }

        const request = new Request({ car, service, date });
        await request.save();
        res.status(200).send(request);
    } catch (error) {
        res.status(400).send({ message: 'Invalid data' });
    }
};

// Получаване на заявки с филтри
exports.getRequests = async (req, res) => {
    const { carId, serviceId, startDate, endDate } = req.query;

    const filters = {};

    if (carId) {
        filters.car = carId;
    }

    if (serviceId) {
        filters.service = serviceId;
    }

    if (startDate && endDate) {
        filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const requests = await Request.find(filters);
        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch requests' });
    }
};
