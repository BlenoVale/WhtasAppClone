import React, { useEffect, useState } from "react";
import './App.css';

import ChatListItems from './components/chatListItem/ChatListItem';
import ChatIntro from "./components/ChatIntro/ChatIntro";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import NewChat from "./components/NewChat/NewChat";

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Login from "./components/Login/Login";
import Api from "./Api";

export default () => {

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);

  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(()=>{
    if(user !== null) {
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  },[user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };

    await Api.addUser(newUser);
    setUser(newUser);
  }

  if (user === null) {
    return (<Login onReceive={handleLoginData} />);
  }

  return (
    <div className="app-window">
      <div className="sidebar">

        <NewChat
          user={user}
          chatList={chatList}
          show={showNewChat}
          setShow={setShowNewChat}
        />

        <header>
          <img
            className="header-avatar"
            src={user.avatar}
            alt="" />
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleNewChat} className="header-btn">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="header-btn">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search-input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder="Procurar ou come??ar uma nova conversa" />
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItems
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined &&
          <ChatWindow data={activeChat} user={user} />
        }

        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}