import React from 'react';
import './styles/main.scss';
import Logo from './assets/img/Logo.png';

function App() {
  return (
    <div className="App">
      <img src={Logo} alt="Simplify"  className="logo"/>
      <div className="form">
        <input type="text" className="input" />
        <input type="password" className="input"/>
        <input type="submit" valur="Login" className="button"/>
      </div>
    </div>
  );
}

export default App;
