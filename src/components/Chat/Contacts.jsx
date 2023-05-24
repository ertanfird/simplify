import React from 'react'
import Profile from './Profile';

export default function Contacts({ contacts, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Users</h3>
    <div className="sidebar__dialogues">
        {contacts.map((user, index) =>
          <Profile
            key={index + Math.random()}
            onClick={() => {
              setDialogue(user.username);
              setStatusSidebar(false)
            }}
            username={user.username}
            status={user.isOnline}
            isHover={true}
          />
        )
        }
    </div>
    </>
  )
}
