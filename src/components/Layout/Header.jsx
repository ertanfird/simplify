import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context';
import Switch from '../UI/Switch';

export default function Header({path, title}) {
  const ctx = useContext(Context);

  return (
    <div className="header">
      <Link to={path}>{title}</Link>
      <Switch
        type="inverse"
        onChange={ctx.handleThemeClick}
        checked={(ctx.theme === 'dark') && "checked"}
      />
    </div>
  )
}
