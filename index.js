import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Стилове, които можеш да добавиш (ако имаш такива)
import App from './App';  // Импортираш компонента App.js

// Рендерираш компонента App в елемента с id="root" от HTML файла
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')  // Трябва да имаш <div id="root"></div> в HTML
);