import React from 'react';

import MessagesHeader from './MessagesHeader';
import MessagesBody from './MessagesBody';
import MessagesForm from './MessagesForm';

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
  sendMessage,
  users
}) {
  return (
    <div className='messages'>
      {
        selectDialogue.status ?
          <>
            <MessagesHeader
              selectDialogue={selectDialogue}
              setSelectDialogue={setSelectDialogue}
              setStatusSidebar={setStatusSidebar}
              contextMenuStatus={contextMenuStatus}
              setContextMenuStatus={setContextMenuStatus}
              setStaticKey={setStaticKey}
              dispatchDialogues={dispatchDialogues}
              users={users}
            />
            <MessagesBody
              messagesBodyRef={messagesBodyRef}
              dialogues={dialogues}
              selectDialogue={selectDialogue}
            />
            <MessagesForm 
              statusConnection={statusConnection}
              selectDialogue={selectDialogue}
              inputMessageRef={inputMessageRef}
              sendMessage={sendMessage}
            />
          </>
          :
          <span className='messages__promt'>Select the dialogue</span>
      }
    </div>
  )
}
