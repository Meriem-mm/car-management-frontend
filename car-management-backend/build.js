const express = require('express');
const path = require('path');
const app = express();

// Обслужваме статични файлове от build папката
app.use(express.static(path.join(__dirname, 'build')));

// За всички останали пътища, връщаме index.html файла на React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Сървър на порт 8088
app.listen(8088, () => {
    console.log('Сървърът работи на порт 8088');
});


