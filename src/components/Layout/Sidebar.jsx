import React, { useContext, useRef, useState } from 'react';

//Data
import Context from '../../context';
import Dialogues from '../Chat/Dialogues';
import Users from '../Chat/Users';

//API
import getUsers from '../../api/Users/Get';

//Components
import Input from '../UI/Input';
import Navbar from './Navbar';

//Icons
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { HiSearch } from "@react-icons/all-files/hi/HiSearch";


export default function Sidebar({
  users,
  setUsers,
  setSelectDialogue,
  dialogues,
  dispatchDialogues,
  statusSidebar,
  setStatusSidebar,
  setPopupStatus
}) {
  const ctx = useContext(Context);
  const [statusNavbar, setStatusNavbar] = useState(false);

  const [usersFilter, setUsersFilter] = useState([])
  const searchUsersRef = useRef(null);

  const handleNavbarClick = () => {
    setStatusNavbar(!statusNavbar)
    console.log(ctx.authToken);
  }

  const setDialogue = (user) => {
    setUsersFilter([]);
    searchUsersRef.current.value = null
    setSelectDialogue({
      status: true,
      user: user
    });
  }

  const searchUsers = (filterValue) => {
    getUsers(filterValue, setUsers)
    setUsersFilter(users.filter(user => user.includes(filterValue)))
    console.log(usersFilter);
  }

  return (
    <div className={`sidebar ${statusSidebar ? '' : 'sidebar-hidden'}`}>
      <div className='sidebar__header'>
        <div className='sidebar__menu' onClick={handleNavbarClick}>
          <HiMenu />
        </div>
        <h2 className='sidebar__title'>Convesation</h2>
      </div>
      <Navbar status={statusNavbar} setPopupStatus={setPopupStatus} />
      <div className='sidebar__dialogues'>
        {
          ((usersFilter.length > 0) && (searchUsersRef.current.value.length > 0)) ?
            (<Users users={usersFilter} setDialogue={setDialogue} setStatusSidebar={setStatusSidebar} />)
            :
            ((dialogues.length > 0) ?
              <Dialogues dialogues={dialogues} setDialogue={setDialogue} setStatusSidebar={setStatusSidebar} />
              :
              (
                (users.length > 0) ?
                  <Users users={users} setDialogue={setDialogue} setStatusSidebar={setStatusSidebar} />
                  :
                  'Find a friend'
              ))
        }
        <form className='sidebar__search'>
          <Input
            type="text"
            placeholder='Search...'
            className="input"
            name="searchUsers"
            ref={searchUsersRef}
            onChange={() => searchUsers(searchUsersRef.current.value)}
          />
          <button type='submit' className='sidebar__searchicon'>
            <HiSearch />
          </button>
        </form>

      </div>
    </div>
  )
};
