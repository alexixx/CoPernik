import './scss/app.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Singleplayer from './pages/Singleplayer';
import Multiplayer from './pages/Multiplayer';
import Game from './components/Game';

function App() {
  return (
    <div className="wrapper">
      {/* <Header /> */}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
