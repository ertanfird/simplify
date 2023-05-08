import md5 from 'md5'
import React from 'react'

export default function Dialogues({ dialogues, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Dialogues</h3>
      {dialogues.map((dialogue, index) =>
        dialogue.receiver &&
        <article
          className='profile profile-dialog'
          key={index + Math.random()}
          onClick={() => { setDialogue(dialogue.receiver); setStatusSidebar(false) }}
        >
          <div className={`profile__avatar profile__avatar-${parseInt(md5(dialogue.receiver).replace(/[^\d]/g, '')).toString()[0]}`}>{dialogue.receiver[0].toUpperCase()}</div>
          <div className='profile__content'>
            <p className='profile__title'>{dialogue.receiver}</p>
            <p className='profile__status'>{dialogue.messages ? (dialogue.messages[dialogue.messages.length - 1].receiver === dialogue.receiver ? `You: ${dialogue.messages[dialogue.messages.length - 1].message}` : dialogue.messages[dialogue.messages.length - 1].message) : 'Online'}</p>
          </div>
        </article>
      )}
    </>
  )
}
