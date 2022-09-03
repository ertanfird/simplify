import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo.svg';
import Context from '../context';



export default function Loginpage(props) {
  const value = useContext(Context);

  function login(e) {
    e.preventDefault();
    value.setIsAuth(true);
  }

  return(
    <div className='container'>
      <div className="header">
        <Link to="../signup" >Sign up</Link>
        <div className="theme__wrapper">
          <div className={"theme " + `theme-${value.theme}`} onClick={value.handleThemeClick}></div>
        </div>
      </div>
      <div className="logo">
        <img src={Logo} alt="Simplify" className="logo__picture" />Simplify
      </div>
      <form className="form" onSubmit={login}>
        <input type="text" className="input" placeholder='Username' />
        <input type="password" className="input" placeholder='Password' />
        <input type="submit" value="Login" className="button"/>
      </form>
    </div>
  );
}
