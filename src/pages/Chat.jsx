import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Context from '../context';
import initMessages from '../helpers/initMessages';

import Alert from '../components/Layout/Alert';
import Sidebar from '../components/Layout/Sidebar';
import ContextMenu from '../components/UI/ContextMenu';
import Popup from '../components/UI/Popup';
import Input from '../components/UI/Input';

import * as signalR from '@microsoft/signalr';
import md5 from 'md5';

import { IoIosPaperPlane } from "@react-icons/all-files/io/IoIosPaperPlane";
import { HiArrowLeft } from "@react-icons/all-files/hi/HiArrowLeft";
import { HiDotsVertical } from "@react-icons/all-files/hi/HiDotsVertical";
import axios from 'axios';

const reduceDialogues = (state, action) => {

  class Message {
    constructor(receiver, message, staticKey) {
      this.receiver = receiver;
      this.message = message;
      this.staticKey = staticKey;
    }
  }

  class Dialogue {
    constructor(receiver, messages) {
      this.receiver = receiver;
      this.messages = messages ? [...messages] : [];
    }
  }

  switch (action.type) {
    case 'SELF_SEND':
      {
        const selectDialogue = state.find(dialogue => dialogue.receiver === action.sender)
        if (!(selectDialogue)) {
          return [...state,
          new Dialogue(action.sender, [new Message(action.receiver, action.message, action.staticKey)])
          ];
        } else {
          const newMessages = [...selectDialogue.messages, new Message(action.receiver, action.message, action.staticKey)];
          const updatedDialogue = new Dialogue(selectDialogue.receiver, [...newMessages]);
          const updatedDialogues = state.map(dialogue => dialogue.receiver === updatedDialogue.receiver ? updatedDialogue : dialogue);
          return updatedDialogues;
        }
      }
    case 'OTHER_SEND':
      {
        const selectDialogue = state.find(dialogue => dialogue.receiver === action.receiver)
        if (!(selectDialogue)) {
          return [...state,
          new Dialogue(action.receiver, [new Message(action.receiver, action.message, action.staticKey)])
          ];
        } else {
          const newMessages = [...selectDialogue.messages, new Message(action.receiver, action.message, action.staticKey)];
          const updatedDialogue = new Dialogue(selectDialogue.receiver, [...newMessages]);
          const updatedDialogues = state.map(dialogue => dialogue.receiver === updatedDialogue.receiver ? updatedDialogue : dialogue);
          return updatedDialogues;
        }
      }
    case 'DELETE_DIALOGUE':
      {
        const updatedDialogues = state.map(dialogue => dialogue.receiver !== action.receiver && dialogue);
        return updatedDialogues;
      }
    default:
      return state
  }
}

export default function Chat(props) {
  const ctx = useContext(Context);
  const inputMessage = useRef(null);
  const messagesBodyRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [statusSidebar, setStatusSidebar] = useState(true);
  const [selectDialogue, setSelectDialogue] = useState({
    status: false,
    user: null
  });

  const [dialogues, dispatchDialogues] = useReducer(reduceDialogues, initMessages)
  const [statusConnection, setStatusConnection] = useState(false);
  const [staticKey, setStaticKey] = useState('1');

  const [contextMenuStatus, setContextMenuStatus] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);

  const contextMenuArr = [
    {
      title: 'Set StaticKey',
      function: ()=>{setStaticKey(prompt("input staticKey").toString())}
    },
    {
      title: 'Remove dialogue',
      function: () => { 
        dispatchDialogues({ type: 'DELETE_DIALOGUE', receiver: selectDialogue.user }) 
        setSelectDialogue({
          status: false,
          user: null
        });
        setContextMenuStatus(false)
      }
    }
  ]

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/Hub", {
      accessTokenFactory: () => ctx.authToken,
      transport: signalR.HttpTransportType.WebSockets,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*'
      },
      skipNegotiation: true
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ActiveUsers", (data) => {
    setUsers(data.usernames);
  });

  connection.on("usergetsonline", (data) => {
    setUsers([data]);
  });

  connection.on("newmessage", async (data) => {
    if (data.receiver === ctx.currentUser) {
      dispatchDialogues({ type: 'SELF_SEND', ...data })
    }
    if (data.sender === ctx.currentUser) {
      dispatchDialogues({ type: 'OTHER_SEND', ...data })
    }
  });

  connection.on("usergetsoffline", (data) => {
    if (users.includes(data)) {
      setUsers(users.splice(users.includes(data)))
    }
  });

  connection.onclose(async () => {
    await start();
  });

  const start = async () => {
    try {
      await connection.start();
      setStatusConnection(true);
      console.log("SignalR Connected.");
    } catch (err) {
      const disconnectedError = `Error: Cannot start a HubConnection that is not in the 'Disconnected' state.`
      if (err.toString() !== disconnectedError) {
        console.error(err);
        setTimeout(start, 2000);
      } else {
        console.warn(disconnectedError);
      }
    }
  };

  useEffect(() => {
    if (!statusConnection) {
      start()
    }
    if(ctx.authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${ctx.authToken}`;
    }
  }, [])

  useEffect(() => {
    messagesBodyRef.current?.scrollTo({
      top: messagesBodyRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [dialogues]);

  return (
    <div className='container container-messages'>
      {popupStatus &&
        <Popup setPopupStatus={setPopupStatus} />
      }
      <Sidebar
        users={users}
        setUsers={setUsers}
        setSelectDialogue={setSelectDialogue}
        dialogues={dialogues}
        dispatchDialogues={dispatchDialogues}
        statusSidebar={statusSidebar}
        setStatusSidebar={setStatusSidebar}
        setPopupStatus={setPopupStatus}
      />
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
                  onContextMenu={(e)=> {e.preventDefault();setContextMenuStatus((prevStatus)=>!prevStatus)}}
                  onClick={(e) => { e.preventDefault(); setContextMenuStatus((prevStatus) => !prevStatus) }}
                  />
                  {
                    contextMenuStatus &&
                    <ContextMenu contextMenuArr={contextMenuArr}></ContextMenu>
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
                  //   inputMessage.current.value,
                  //   onRefreshToken,
                  //   ctx,
                  // );
                  inputMessage.current.value = '';
                }}
              >
                <Input
                  className='input messages__input'
                  type="text"
                  placeholder="Write messages"
                  name="message"
                  autoComplete="off"
                  ref={inputMessage}
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
    </div>
  );
}
