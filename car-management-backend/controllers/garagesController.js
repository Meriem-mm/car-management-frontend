const Service = require('../models/serviceModel');

// Получаване на всички сервизи
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Получаване на конкретен сервиз по ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Добавяне на нов сервиз
exports.createService = async (req, res) => {
    const { name, city, capacity } = req.body;
    try {
        const newService = new Service({ name, city, capacity });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Обновяване на сервиз
exports.updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Изтриване на сервиз
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
