const express = require('express');
const app = express();
const port = 8088;


// Мидълуер за парсване на JSON
app.use(express.json());

// Примерен масив за съхранение на сервизи (може да се замени с база данни)
let services = [
    { id: 1, name: 'Service A', city: 'City X', capacity: 10 },
    { id: 2, name: 'Service B', city: 'City Y', capacity: 5 },
];

// Примерен масив за съхранение на автомобили
let cars = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, serviceIds: [1] },
    { id: 2, make: 'BMW', model: '320i', year: 2021, serviceIds: [2] },
];

// Примерен масив за съхранение на заявки за поддръжка
let maintenanceRequests = [
    { id: 1, carId: 1, serviceId: 1, date: '2024-01-15' },
    { id: 2, carId: 2, serviceId: 2, date: '2024-01-16' },
];

// --------------- Сервизи ---------------------

// Получаване на всички сервизи
app.get('/api/services', (req, res) => {
    const city = req.query.city;  // Може да се филтрира по град
    if (city) {
        return res.json(services.filter(service => service.city === city));
    }
    res.json(services);
});


// Получаване на конкретен сервиз по ID
app.get('/api/services/:id', (req, res) => {
    const service = services.find(s => s.id === parseInt(req.params.id));
    if (!service) {
        return res.status(404).send('Service not found');
    }
    res.json(service);
});

// Създаване на нов сервиз
app.post('/api/services', (req, res) => {
    const { name, city, capacity } = req.body;
    const newService = { id: services.length + 1, name, city, capacity };
    services.push(newService);
    res.status(201).json(newService);
});

// Обновяване на сервиз
app.put('/api/services/:id', (req, res) => {
    const service = services.find(s => s.id === parseInt(req.params.id));
    if (!service) {
        return res.status(404).send('Service not found');
    }

    const { name, city, capacity } = req.body;
    service.name = name || service.name;
    service.city = city || service.city;
    service.capacity = capacity || service.capacity;

    res.json(service);
});

// Изтриване на сервиз
app.delete('/api/services/:id', (req, res) => {
    const serviceIndex = services.findIndex(s => s.id === parseInt(req.params.id));
    if (serviceIndex === -1) {
        return res.status(404).send('Service not found');
    }

    services.splice(serviceIndex, 1);
    res.status(204).send();
});

// --------------- Автомобили ---------------------

// Получаване на всички автомобили
app.get('/api/cars', (req, res) => {
    const make = req.query.make;  // Може да се филтрира по марка
    const year = req.query.year;  // Може да се филтрира по година

    let filteredCars = cars;

    if (make) {
        filteredCars = filteredCars.filter(car => car.make === make);
    }
    if (year) {
        filteredCars = filteredCars.filter(car => car.year === parseInt(year));
    }

    res.json(filteredCars);
});

// Получаване на конкретен автомобил по ID
app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.json(car);
});

// Създаване на нов автомобил
app.post('/api/cars', (req, res) => {
    const { make, model, year, serviceIds } = req.body;
    const newCar = { id: cars.length + 1, make, model, year, serviceIds };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Обновяване на автомобил
app.put('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).send('Car not found');
    }

    const { make, model, year, serviceIds } = req.body;
    car.make = make || car.make;
    car.model = model || car.model;
    car.year = year || car.year;
    car.serviceIds = serviceIds || car.serviceIds;

    res.json(car);
});

// Изтриване на автомобил
app.delete('/api/cars/:id', (req, res) => {
    const carIndex = cars.findIndex(c => c.id === parseInt(req.params.id));
    if (carIndex === -1) {
        return res.status(404).send('Car not found');
    }

    cars.splice(carIndex, 1);
    res.status(204).send();
});

// --------------- Заявки за поддръжка ---------------------

// Получаване на всички заявки за поддръжка
app.get('/api/maintenance-requests', (req, res) => {
    const carId = req.query.carId;
    const serviceId = req.query.serviceId;
    const date = req.query.date;

    let filteredRequests = maintenanceRequests;

    if (carId) {
        filteredRequests = filteredRequests.filter(request => request.carId === parseInt(carId));
    }
    if (serviceId) {
        filteredRequests = filteredRequests.filter(request => request.serviceId === parseInt(serviceId));
    }
    if (date) {
        filteredRequests = filteredRequests.filter(request => request.date === date);
    }

    res.json(filteredRequests);
});

// Получаване на конкретна заявка по ID
app.get('/api/maintenance-requests/:id', (req, res) => {
    const request = maintenanceRequests.find(r => r.id === parseInt(req.params.id));
    if (!request) {
        return res.status(404).send('Maintenance request not found');
    }
    res.json(request);
});

// Създаване на нова заявка за поддръжка
app.post('/api/maintenance-requests', (req, res) => {
    const { carId, serviceId, date } = req.body;

    // Проверка дали има свободен капацитет в сервиза за избраната дата
    const service = services.find(s => s.id === serviceId);
    if (!service) {
        return res.status(404).send('Service not found');
    }

    const requestsOnDate = maintenanceRequests.filter(r => r.serviceId === serviceId && r.date === date);
    if (requestsOnDate.length >= service.capacity) {
        return res.status(400).send('No available slots at the selected service for the given date');
    }

    const newRequest = { id: maintenanceRequests.length + 1, carId, serviceId, date };
    maintenanceRequests.push(newRequest);
    res.status(201).json(newRequest);
});

// Обновяване на заявка за поддръжка
app.put('/api/maintenance-requests/:id', (req, res) => {
    const request = maintenanceRequests.find(r => r.id === parseInt(req.params.id));
    if (!request) {
        return res.status(404).send('Maintenance request not found');
    }

    const { carId, serviceId, date } = req.body;
    request.carId = carId || request.carId;
    request.serviceId = serviceId || request.serviceId;
    request.date = date || request.date;

    res.json(request);
});

// Изтриване на заявка за поддръжка
app.delete('/api/maintenance-requests/:id', (req, res) => {
    const requestIndex = maintenanceRequests.findIndex(r => r.id === parseInt(req.params.id));
    if (requestIndex === -1) {
        return res.status(404).send('Maintenance request not found');
    }

    maintenanceRequests.splice(requestIndex, 1);
    res.status(204).send();
});

// --------------- Стартиране на сървъра ---------------------

app.listen(port, () => {
    console.log(`Сървърът е стартиран на http://127.0.0.1:8088`);
});


    app.get('/', (req, res) => {
        res.send('Сървърът работи успешно!');

});







