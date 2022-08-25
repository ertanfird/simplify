import React from 'react';
import './styles/main.scss';
import Logo from './assets/img/Logo.svg';

function App() {
  return (
    <div className="App">
      <img src={Logo} alt="Simplify"  className="logo"/>
      <div className="form">
        <input type="text" className="input" placeholder='E-mail' />
        <input type="password" className="input" placeholder='Password'/>
        <input type="submit" value="Login" className="button"/>
      </div>
    </div>
  );
}

export default App;
