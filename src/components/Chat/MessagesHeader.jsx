import React, { useEffect } from 'react';

import ContextMenu from '../UI/ContextMenu';

import contextMenuArr from '../../helpers/contextMenuArr';

import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';

import md5 from 'md5';

export default function MessagesHeader({
  selectDialogue,
  setSelectDialogue,
  setStatusSidebar,
  contextMenuStatus,
  setContextMenuStatus,
  setStaticKey,
  dispatchDialogues,
}) {
  return (
    <div className='messages__header'>
      <article className='profile profile'>
        <div className='profile__arrow' onClick={() => { setStatusSidebar(true) }}>
          <HiArrowLeft />
        </div>
        <div className={`profile__avatar profile__avatar-${parseInt(md5(selectDialogue.user).replace(/[^\d]/g, '')).toString()[0]}`}>{selectDialogue.user[0].toUpperCase()}</div>
        <div className='profile__content'>
          <p className='profile__title'>{selectDialogue.user}</p>
          <p className='profile__status'>Online</p>
        </div>
      </article>
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
