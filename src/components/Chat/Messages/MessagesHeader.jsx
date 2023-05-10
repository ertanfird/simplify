import React, { useEffect } from 'react';

import ContextMenu from '../../UI/ContextMenu';

import contextMenuArr from '../../../helpers/contextMenuArr';

import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';

import Profile from '../Profile';

export default function MessagesHeader({
  selectDialogue,
  setSelectDialogue,
  setStatusSidebar,
  contextMenuStatus,
  setContextMenuStatus,
  setStaticKey,
  dispatchDialogues,
  users
}) {
  const status = users.find(user => user.username === selectDialogue.user).isOnline
  return (
    <div className='messages__header'>
      <Profile username={selectDialogue.user}  status={status}>
        <div className='profile__arrow' onClick={() => { setStatusSidebar(true) }}>
          <HiArrowLeft />
        </div>
      </Profile>
      <div className='messages__more'>
        <HiDotsVertical
          onContextMenu={(e) => { e.preventDefault(); setContextMenuStatus((prevStatus) => !prevStatus) }}
          onClick={(e) => { e.preventDefault(); setContextMenuStatus((prevStatus) => !prevStatus) }}
        />
        {
          contextMenuStatus &&
          <ContextMenu contextMenuArr={
            contextMenuArr(
              setStaticKey,
              dispatchDialogues,
              selectDialogue,
              setSelectDialogue,
              setContextMenuStatus
            )}
          />
        }

      </div>
    </div>
  )
}
