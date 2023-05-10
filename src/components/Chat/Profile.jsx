import React from 'react';
import avatarGenerator from '../../helpers/AvatarGenerator';

export default function Profile({ username, status, isHover, children, onClick, message }) {
  return (
    <article className={`profile ${isHover ? 'profile-dialog' : ''}`} onClick={onClick}>
      {children}
      <div className={`profile__avatar profile__avatar-${avatarGenerator(username)}`}>{username[0].toUpperCase()}</div>
      <div className='profile__content'>
        <p className='profile__title'>{username}</p>
        {
          message ?
            <p className={`profile__status ${message ? 'profile__status-active' : ''}`}>{message}</p>
            :
            <p className={`profile__status ${status ? 'profile__status-active' : ''}`}>{status ? 'Online' : 'Ofline'}</p>
        }
      </div>
    </article>
  )
}
