import React from 'react'
import Profile from './Profile';

export default function Users({ users, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Users</h3>
      <div className="sidebar__dialogues">
        {users.map((user, index) =>
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
