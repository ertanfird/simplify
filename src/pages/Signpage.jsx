import React from 'react';
import Logo from '../assets/img/Logo.svg';

const Signpage = ({props}) => (
  <div>
    <img src={Logo} alt="Simplify"  className="logo"/>
    <div className="form">
      <input type="text" className="input" placeholder='E-mail' />
      <input type="password" className="input" placeholder='Password'/>
      <input type="password" className="input" placeholder='Repeat Password'/>
      <input type="submit" value="Login" className="button"/>
    </div>
  </div>
);

export default Signpage;
