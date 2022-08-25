import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './styles/main.scss';
import Loginpage from './pages/Loginpage';
import Signpage from './pages/Signpage';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ [<Loginpage />] } />
      <Route path="/signup" element={ [<Signpage />] } />
      <Route path="*" element={ [] } />
    </Routes>
    </div>
  );
}

export default App;
