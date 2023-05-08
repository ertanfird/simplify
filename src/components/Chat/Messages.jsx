import React, { useContext } from 'react';

import Context from '../../context';

import Input from '../UI/Input';
import Alert from '../Layout/Alert';

import { IoIosPaperPlane } from "@react-icons/all-files/io/IoIosPaperPlane";
import MessagesHeader from './MessagesHeader';

export default function Messages({
  dialogues,
  selectDialogue,
  setSelectDialogue,
  setStatusSidebar,
  contextMenuStatus,
  setContextMenuStatus,
  setStaticKey,
  dispatchDialogues,
  messagesBodyRef,
  inputMessageRef,
  statusConnection,
  sendMessage
}) {
  const ctx = useContext(Context);
  return (
    <div className='messages'>
      {
        selectDialogue.status ?
          <>
            <MessagesHeader
              setSelectDialogue={setSelectDialogue}
              setStatusSidebar={setStatusSidebar}
              contextMenuStatus={contextMenuStatus}
              setContextMenuStatus={setContextMenuStatus}
              setStaticKey={setStaticKey}
              dispatchDialogues={dispatchDialogues}
            />
            <div className='messages__body' ref={messagesBodyRef} >
              <Alert />
              <div className='messages__container' >
                {dialogues.find(dialogue => dialogue.receiver === selectDialogue.user) && dialogues.find(dialogue => dialogue.receiver === selectDialogue.user).messages.map((message, index) =>
                  <div
                    key={index + Math.random()}
                    className={`messages__message messages__message-${(message.receiver !== ctx.currentUser) ? 'mine' : 'other'}`}
                  >
                    {message.message}
                  </div>
                )}
              </div>
            </div>
            <form
              className='messages__form'
              onSubmit={(e) => {
                e.preventDefault();
                if (statusConnection.state === 'Connected') {
                  sendMessage(statusConnection, selectDialogue.user, inputMessageRef.current.value)
                } else {
                  setTimeout(() => {
                    sendMessage(statusConnection, selectDialogue.user, inputMessageRef.current.value)
                  }, 2000)
                }
                inputMessageRef.current.value = '';
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
          </>
          :
          <span className='messages__promt'>Select the dialogue</span>
      }
    </div>
  )
}
