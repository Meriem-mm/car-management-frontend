const express = require('express');
const app = express();
const port = 8088;

// Основен маршрут за тест
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
