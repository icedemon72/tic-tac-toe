import { Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';

// Components
import Navigation from './components/navigation/Navigation';
import Home from './components/pages/home/Home';
import Game from './components/pages/game/Game';
import Stats from './components/pages/stats/Stats';

// Bootstrap
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false); 

  const hideTheNavbar = () => {
    setIsPlaying(prevStatus => !prevStatus);
  }

  return (
    <>
    <Navigation playing={isPlaying}/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game' element={<Game hideTheNavbar={hideTheNavbar} />} />
      <Route path='/stats' element={<Stats />} />
    </Routes>

    </>
  );
}


export default App;
