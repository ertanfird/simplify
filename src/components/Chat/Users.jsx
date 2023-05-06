import md5 from 'md5'
import React from 'react'

export default function Users({ users, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Contacts</h3>
      {users.map((user, index) =>
        <article
          className='profile profile-dialog'
          key={index + Math.random()}
          onClick={() => { setDialogue(user.username); setStatusSidebar(false) }}
        >
          <div className={`profile__avatar profile__avatar-${parseInt(md5(user.username).replace(/[^\d]/g, '')).toString()[0]}`}>{user.username[0].toUpperCase()}</div>
          <div className='profile__content'>
            <p className='profile__title'>{user.username}</p>
            <p className='profile__status'>{user.isOnline?'Online':'Ofline'}</p>
          </div>
        </article>
      )
      }
    </>
  )
}
