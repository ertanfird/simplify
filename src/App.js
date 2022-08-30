import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {privateRoutes, publicRoutes} from './router';
import './styles/main.scss';
import Logo from './assets/img/Logo.svg';
import {useTheme} from './hooks/useTheme'

function App() {
  const isAuth = false;
  const {theme, setTheme} = useTheme();

  const handleThemeClick = (e) => {
    if (theme == 'light'){
      setTheme('dark');
      e.target.classList.toggle('theme-light');
      e.target.classList.toggle('theme-dark');
    } else {
      setTheme('light');
      e.target.classList.toggle('theme-light');
      e.target.classList.toggle('theme-dark');
    }
  }

  return (
    <div className="App">
  <div className='container'>
    <div className="header">
      <Link to="../signup" >Sign up</Link>
      <div className="theme__wrapper">
        <div className="theme theme-light" onClick={handleThemeClick}></div>
      </div>
    </div>
    <img src={Logo} alt="Simplify" className="logo" />
    <div className="form">
      <input type="text" className="input" placeholder='Username' />
      <input type="password" className="input" placeholder='Password' />
      <input type="submit" value="Login" className="button" />
    </div>
  </div>
    </div>
  );
}

export default App;
