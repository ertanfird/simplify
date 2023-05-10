import React from 'react';

import Input from '../../UI/Input';

import { IoIosPaperPlane } from '@react-icons/all-files/io/IoIosPaperPlane';

export default function MessagesForm({ statusConnection, selectDialogue, inputMessageRef, sendMessage }) {
  return (
    <form
      className='messages__form'
      onSubmit={(e) => {
        e.preventDefault();
        if (statusConnection.state === 'Connected') {
          sendMessage(statusConnection, selectDialogue.user, inputMessageRef)
        } else {
          setTimeout(() => {
            sendMessage(statusConnection, selectDialogue.user, inputMessageRef)
          }, 2000)
        }
      }}
    >
      <Input
        className='input messages__input'
        type="text"
        placeholder="Write messages"
        name="message"
        autoComplete="off"
        ref={inputMessageRef}
      />
      <button type='submit' className='messages__send'>
        <IoIosPaperPlane />
      </button>
    </form>
  )
}
