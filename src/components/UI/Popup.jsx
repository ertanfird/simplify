import React, { useContext } from 'react'
import { HiOutlineX } from "@react-icons/all-files/hi/HiOutlineX";
import { onDelete } from '../../api/User';
import Context from '../../context';

export default function Popup({setPopupStatus}) {
  const ctx = useContext(Context);

  const logout = () => {
    ctx.setIsAuth(false);
  }
  return (
    <>
      <div className='popup__wrapper' onClick={() => setPopupStatus(false)}>
      </div>
      <div className='popup'>
        <div className='popup__title'>Settings
          <HiOutlineX className='popup__icon' onClick={() => setPopupStatus(false)} />
        </div>
        <div className='popup__body'>
          <div className='popup__item popup__item-red' onClick={() => { onDelete(); logout()}}>
            Delete profile
          </div>
        </div>
      </div>
    </>
    
  )
}
