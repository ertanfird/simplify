import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Context from '../context';
import initMessages from '../helpers/initMessages';

import Sidebar from '../components/Layout/Sidebar/Sidebar';
import Popup from '../components/UI/Popup';

import onRefreshToken from '../api/Auth/RefreshToken';
import getTemporary from '../api/Contacts/Temporary';

import * as signalR from '@microsoft/signalr';

import axios from 'axios';
import Messages from '../components/Chat/Messages/Messages';

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
  const inputMessageRef = useRef(null);
  const messagesBodyRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statusSidebar, setStatusSidebar] = useState(true);
  const [selectDialogue, setSelectDialogue] = useState({
    status: false,
    user: null
  });

  const [dialogues, dispatchDialogues] = useReducer(reduceDialogues, initMessages)
  const [statusConnection, setStatusConnection] = useState(false);
  const [staticKey, setStaticKey] = useState('');

  const [contextMenuStatus, setContextMenuStatus] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);

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

  connection.on("usergetsoffline", (data) => {
    if (users.includes(data)) {
      setUsers(users.splice(users.includes(data)))
    }
  });

  connection.on("newmessage", async (data) => {
    if (data.receiver === ctx.currentUser) {
      dispatchDialogues({ type: 'SELF_SEND', ...data })
    }
    if (data.sender === ctx.currentUser) {
      dispatchDialogues({ type: 'OTHER_SEND', ...data })
    }
    if( !users.find(user => user.username === data.sender)){
      setUsers(prevUsers => [...prevUsers, {username: data.sender, isOnline: true}])
    }
  });

  const sendMessage = async (currentConnection, receiver, refValue) => {
    try {
      await currentConnection.invoke("SendMessage", {
        "id": `${Math.random()}${Date.now()}`,
        "receiver": receiver,
        "message": refValue.current.value
      });
      refValue.current.value = '';
    } catch (err) {
      const сlientHubException = err.message.match(/[^:]+:\s*\[(.*)\]/)[1]
      ctx.dispatchStatusServer({
        type: 'ERROR',
        data: сlientHubException
      });
    } finally {
      setTimeout(() => {
        ctx.dispatchStatusServer({ type: 'DEFAULT' })
      }, "2000");
    }
  };


  connection.onclose(async () => {
    await start();
  });

  const start = async () => {
    try {
      await connection.start();
      setStatusConnection(connection);
      console.log("SignalR Connected.");
    } catch (err) {
      setStatusConnection(false);
      // setNeedRefreshToken({status: true, fn: start})
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
    if (ctx.authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${ctx.authToken}`;
    }
  }, [])

  useEffect(() => {
    if (ctx.needRefreshToken) {
      onRefreshToken(ctx, ctx.needRefreshToken.fn, ctx.needRefreshToken.fnData)
    }
  }, [ctx.needRefreshToken])

  useEffect(()=>{
    getTemporary(setUsers);
  },[])

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
        usersFilter={usersFilter}
        setUsersFilter={setUsersFilter}
      />
      <Messages
        dialogues={dialogues}
        selectDialogue={selectDialogue}
        setSelectDialogue={setSelectDialogue}
        setStatusSidebar={setStatusSidebar}
        contextMenuStatus={contextMenuStatus}
        setContextMenuStatus={setContextMenuStatus}
        setStaticKey={setStaticKey}
        dispatchDialogues={dispatchDialogues}
        messagesBodyRef={messagesBodyRef}
        inputMessageRef={inputMessageRef}
        statusConnection={statusConnection}
        sendMessage={sendMessage}
        users={users}
      />
    </div>
  );
}
