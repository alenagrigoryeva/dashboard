import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import MainWindow from './pages/Главная'
import Film from './pages/Фильм';
import Films from './pages/Фильмы';
import Serials from './pages/Сериалы';
import News from './pages/Новости';
import Premieres from './pages/Премьеры';
import Collections from './pages/Коллекции';

import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainWindow/> } />
          <Route path="Главная" element={<MainWindow/> } />
          <Route path="Фильм" element={<Film />} />
          <Route path="Фильмы" element={<Films />} />
          <Route path="Сериалы" element={<Serials />} />
          <Route path="Новости" element={<News />} />
          <Route path="Премьеры" element={<Premieres />} />
          <Route path="Коллекции" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
