import React, { useContext } from 'react';
import Context from '../../../context';
import { HiMenu } from '@react-icons/all-files/hi/HiMenu';

export default function SidebarHeader({ statusNavbar, setStatusNavbar }) {
  const ctx = useContext(Context);

  return (
    <div className='sidebar__header'>
      <div className='sidebar__menu' onClick={() => { setStatusNavbar(!statusNavbar) }}>
        <HiMenu />
      </div>
      <p className='sidebar__title'>{ctx.currentUser}</p>
    </div>
  )
};
