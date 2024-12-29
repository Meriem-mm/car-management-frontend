const express = require('express');
const router = express.Router();

// Примерен маршрут за проверка дали API-то е работещо
router.get('/', (req, res) => {
    res.send('API-то работи!');
});

// Маршрут за показване на всички сервизи
router.get('/services', (req, res) => {
    res.json([
        { id: 1, name: 'Сервиз 1', city: 'София' },
        { id: 2, name: 'Сервиз 2', city: 'Пловдив' },
        // Добавете повече сервизи тук
    ]);
});

// Маршрут за създаване на нов сървиз
router.post('/services', (req, res) => {
    const newService = req.body;
    // Логика за създаване на нов сървиз (в базата данни, в паметта и т.н.)
    newService.id = Math.floor(Math.random() * 1000);  // Генериране на уникален ID
    res.status(201).json(newService);  // Връща създадения сървиз
});

// Маршрут за показване на всички автомобили
router.get('/cars', (req, res) => {
    res.json([
        { id: 1, make: 'BMW', model: 'X5', year: 2020 },
        { id: 2, make: 'Audi', model: 'A6', year: 2019 },
        // Добавете повече автомобили тук
    ]);
});

// Маршрут за създаване на нов автомобил
router.post('/cars', (req, res) => {
    const newCar = req.body;
    // Логика за създаване на нов автомобил
    newCar.id = Math.floor(Math.random() * 1000);  // Генериране на уникален ID
    res.status(201).json(newCar);  // Връща създадения автомобил
});

// Маршрут за показване на всички заявки за поддръжка
router.get('/maintenance-requests', (req, res) => {
    res.json([
        { id: 1, carId: 1, serviceId: 1, date: '2024-01-15', status: 'Pending' },
        { id: 2, carId: 2, serviceId: 2, date: '2024-01-20', status: 'Completed' },
        // Добавете повече заявки за поддръжка тук
    ]);
});

// Маршрут за създаване на нова заявка за поддръжка
router.post('/maintenance-requests', (req, res) => {
    const newRequest = req.body;
    // Логика за създаване на нова заявка
    newRequest.id = Math.floor(Math.random() * 1000);  // Генериране на уникален ID
    res.status(201).json(newRequest);  // Връща създадената заявка
});

// Маршрут за получаване на подробности за конкретен сървиз
router.get('/services/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    // Логика за извличане на конкретен сървиз по ID
    res.json({ id: serviceId, name: 'Сервиз ' + serviceId, city: 'София' });
});

// Маршрут за получаване на подробности за конкретен автомобил
router.get('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    // Логика за извличане на конкретен автомобил по ID
    res.json({ id: carId, make: 'BMW', model: 'X5', year: 2020 });
});

// Маршрут за получаване на подробности за конкретна заявка за поддръжка
router.get('/maintenance-requests/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    // Логика за извличане на конкретна заявка за поддръжка по ID
    res.json({ id: requestId, carId: 1, serviceId: 1, date: '2024-01-15', status: 'Pending' });
});

module.exports = router;  // Експортиране на маршрута за използване в server.js

