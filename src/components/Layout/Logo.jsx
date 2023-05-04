import React from 'react';
import LogoIcon from '../../assets/img/Logo.svg';

export default function Logo() {
  return (
    <div className="logo">
      <img src={LogoIcon} alt="Simplify" className="logo__picture" />Simplify
    </div>
  )
}
