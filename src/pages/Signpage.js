import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo.svg';
import Context from '../context';

export default function Signuppage(props) {
  const value = useContext(Context);

  return(
    <div className='container'>
      <div className="header">
        <Link to="../login" >Login</Link>
        <div className="theme__wrapper">
          <div className={"theme " + `theme-${value.theme}`} onClick={value.handleThemeClick}></div>
        </div>
      </div>
      <div className="logo">
        <img src={Logo} alt="Simplify" className="logo__picture" />Simplify
      </div>
      <div className="form">
        <input type="text" className="input" placeholder='Username' />
        <input type="password" className="input" placeholder='Password' />
        <input type="password" className="input" placeholder='Repeat, password' />
        <div className="checkbox__wrapper">
          <input type="checkbox" className="checkbox" name="terms"/>
          <label htmlFor="terms" className="checkbox__label">I confirmed Term Use</label>
        </div>

        <input type="submit" value="Sign up" className="button" />
      </div>
    </div>
  );
}
