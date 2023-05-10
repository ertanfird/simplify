import React, { useContext } from 'react';

import Alert from '../../Layout/Alert';

import Context from '../../../context';

export default function MessagesBody({ messagesBodyRef, dialogues, selectDialogue }) {
  const ctx = useContext(Context);
  return (
    <div className='messages__body' ref={messagesBodyRef} >
      <Alert />
      <div className='messages__container' >
        {dialogues.find(dialogue => dialogue.receiver === selectDialogue.user) &&
          dialogues.find(dialogue => dialogue.receiver === selectDialogue.user).messages.map((message, index) =>
            <div
              key={index + Math.random()}
              className={`messages__message messages__message-${(message.receiver !== ctx.currentUser) ? 'mine' : 'other'}`}
            >
              {message.message}
            </div>
          )}
      </div>
    </div>
  )
}
