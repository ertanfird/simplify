import React, { useContext } from 'react';
import Context from '../../context';
import Switch from '../UI/Switch';
import { HiLogout } from "@react-icons/all-files/hi/HiLogout";
import { HiOutlineCog } from "@react-icons/all-files/hi/HiOutlineCog";
import { HiOutlineChat } from "@react-icons/all-files/hi/HiOutlineChat";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";

export default function Navbar({ status, setPopupStatus }) {
  const ctx = useContext(Context);

  const logout = () => {
    ctx.setIsAuth(false);
  }
  return (
    <div className={`navbar ${status?'active':''}`}>
      <div className='navbar__item'>
        <div className='navbar__subitem'>
          <HiOutlineChat />
          <input type="submit" value="Dialogues" className="link" onClick={logout} />
        </div>
        <div className='navbar__subitem'>
          <HiOutlineUsers />
          <input type="submit" value="Contacts" className="link" onClick={logout} />
        </div>
        <div className='navbar__subitem' onClick={() => setPopupStatus(true)}>
          <HiOutlineCog />
          <input type="submit" value="Settings" className="link" />
        </div>
        <div className='navbar__subitem'>
          <HiLogout />
          <input type="submit" value="Logout" className="link" onClick={logout} />
        </div>
      </div>
      <div className='navbar__item navbar__item-switch'>
        <Switch
          type="inverse"
          onChange={ctx.handleThemeClick}
          checked={(ctx.theme === 'dark') && "checked"}
        />
      </div>
    </div>
  )
};
