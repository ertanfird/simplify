import md5 from 'md5'
import React from 'react'

export default function Users({ users, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Active users</h3>
      {users.map((user, index) =>
        <article
          className='profile profile-dialog'
          key={index + Math.random()}
          onClick={() => { setDialogue(user); setStatusSidebar(false) }}
        >
          <div className={`profile__avatar profile__avatar-${parseInt(md5(user).replace(/[^\d]/g, '')).toString()[0]}`}>{user[0].toUpperCase()}</div>
          <div className='profile__content'>
            <p className='profile__title'>{user}</p>
            <p className='profile__status'>Online</p>
          </div>
        </article>
      )
      }
    </>
  )
}
