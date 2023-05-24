import React from 'react'

import Input from '../../UI/Input'

import { HiSearch } from '@react-icons/all-files/hi/HiSearch'

export default function SidebarSearch({
  searchUsersRef,
  searchUsers
}) {
  return (
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
  )
}
