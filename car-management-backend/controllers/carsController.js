const Car = require('../models/carModel');

// Получаване на всички автомобили
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Добавяне на нов автомобил
exports.createCar = async (req, res) => {
    const { brand, model, year, services } = req.body;
    try {
        const newCar = new Car({ brand, model, year, services });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Обновяване на автомобил
exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Изтриване на автомобил
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
