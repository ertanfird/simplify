import React, { useContext, useRef, useState } from 'react';

//Data
import Context from '../../../context';
import Dialogues from '../../Chat/Dialogues';

//API
import getUsers from '../../../api/Users/Get';

//Components
import Input from '../../UI/Input';
import Navbar from '../Navbar';
import Users from '../../Chat/Users';

//Icons
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { HiSearch } from "@react-icons/all-files/hi/HiSearch";
import SidebarSearch from './SidebarSearch';
import SidebarHeader from './SidebarHeader';

export default function Sidebar({
  users,
  setUsers,
  setSelectDialogue,
  dialogues,
  statusSidebar,
  setStatusSidebar,
  setPopupStatus,
  usersFilter,
  setUsersFilter
}) {
  const ctx = useContext(Context);
  const [statusNavbar, setStatusNavbar] = useState(false);

  const searchUsersRef = useRef(null);



  const setDialogue = (user) => {
    setUsersFilter([]);
    searchUsersRef.current.value = null
    setSelectDialogue({
      status: true,
      user: user
    });
  }

  const searchUsers = (filterValue) => {
    getUsers(filterValue, setUsers, ctx)
    setUsersFilter(users.filter(user => user.username.includes(filterValue)))
    console.log(usersFilter);
  }

  return (
    <div className={`sidebar ${statusSidebar ? '' : 'sidebar-hidden'}`}>
      <SidebarHeader statusNavbar={statusNavbar} setStatusNavbar={setStatusNavbar} />
      <Navbar status={statusNavbar} setPopupStatus={setPopupStatus} />
      <div className='sidebar__body'>
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
        <SidebarSearch
          searchUsersRef={searchUsersRef}
          searchUsers={searchUsers}
        />

      </div>
    </div>
  )
};
