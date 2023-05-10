import md5 from 'md5'
import React from 'react'
import Profile from './Profile'

export default function Dialogues({ dialogues, setDialogue, setStatusSidebar }) {
  return (
    <><h3>Dialogues</h3>
      {dialogues.map((dialogue, index) =>
        dialogue.receiver &&
        <Profile
          key={index + Math.random()}
          onClick={() => {
            setDialogue(dialogue.receiver);
            setStatusSidebar(false)
          }}
          username={dialogue.receiver}
          isHover={true}
          message={(dialogue.messages[dialogue.messages.length - 1].receiver === dialogue.receiver ? `You: ${dialogue.messages[dialogue.messages.length - 1].message}` : dialogue.messages[dialogue.messages.length - 1].message)}
        />
      )}
    </>
  )
}
