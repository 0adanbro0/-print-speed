import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Импортируем само приложение
import '../../style.css'        // Глобальные стили

// Находим элемент в index.html и рендерим в него компонент App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
)