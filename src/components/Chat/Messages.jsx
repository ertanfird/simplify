import React, { useContext } from 'react';

import Context from '../../context';

import ContextMenu from '../UI/ContextMenu';
import Input from '../UI/Input';

import contextMenuArr from '../../helpers/contextMenuArr';

import { IoIosPaperPlane } from "@react-icons/all-files/io/IoIosPaperPlane";
import { HiArrowLeft } from "@react-icons/all-files/hi/HiArrowLeft";
import { HiDotsVertical } from "@react-icons/all-files/hi/HiDotsVertical";

import md5 from 'md5';
import Alert from '../Layout/Alert';

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
  inputMessageRef
}) {
  const ctx = useContext(Context);
  return (
    <div className='messages'>
      {
        selectDialogue.status ?
          <>
            <div className='messages__header'>
              <article className='profile profile'>
                <div className='profile__arrow' onClick={() => { setStatusSidebar(true) }}>
                  <HiArrowLeft />
                </div>
                <div className={`profile__avatar profile__avatar-${parseInt(md5(selectDialogue.user).replace(/[^\d]/g, '')).toString()[0]}`}>{selectDialogue.user[0].toUpperCase()}</div>
                <div className='profile__content'>
                  <p className='profile__title'>{selectDialogue.user}</p>
                  <p className='profile__status'>Online</p>
                </div>
              </article>
              <div className='messages__more'>
                <HiDotsVertical
                  onContextMenu={(e) => { e.preventDefault(); setContextMenuStatus((prevStatus) => !prevStatus) }}
                  onClick={(e) => { e.preventDefault(); setContextMenuStatus((prevStatus) => !prevStatus) }}
                />
                {
                  contextMenuStatus &&
                  <ContextMenu contextMenuArr={contextMenuArr(
                    setStaticKey,
                    dispatchDialogues,
                    selectDialogue,
                    setSelectDialogue,
                    setContextMenuStatus
                  )}></ContextMenu>
                }

              </div>
            </div>
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
                // onSend(
                //   Math.random().toString(),
                //   selectDialogue.user,
                //   staticKey,
                //   inputMessageRef.current.value,
                //   onRefreshToken,
                //   ctx,
                // );
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
