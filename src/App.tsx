import './scss/app.scss';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Singleplayer from './pages/Singleplayer';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Welcome />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        {/* <Route path="/multiplayer" element={<Multiplayer />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
