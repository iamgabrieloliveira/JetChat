import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import { Header } from "../components/Header";
import { Message } from "../components/Message";
import { io } from 'socket.io-client';
import { 
  GlobalStyle,
  Main,
  LeftContainer,
  Chat,
  MessageWrapper, 
  SendForm,
  UserCardTitle, 
  OnlineIcon, 
  UserCard,
  SendInput, 
  SendButton 
} from '../style/home-style';


export function Home() {
  let sendMessageInput = useRef();

  const [socket, setSocket] = useState();
  const [Messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [NewMessage, setNewMessage] = useState('');
  const [user, setUser] = useState("");
  const [room, setRoom] = useState();
  const [rooms, setRooms] = useState();

  const scrollToBottom = (id) => {
    setTimeout(() => {
      const element = document.querySelector(id);
      element.scrollTop = element.scrollHeight;
    }, 1);
  }

  const sendMessage = () => {
    if (!socket | !NewMessage) return;
    let today = new Date();
    let minutes = today.getMinutes().toString().length === 1 ? "0" + today.getMinutes().toString() : today.getMinutes().toString();
    let time = today.getHours() + ":" + minutes;

    const message = { content: NewMessage, user, time, room }

    socket.emit("message", message);
    setMessages(prevState => [...prevState, message])

    sendMessageInput.current.value = "";
    setNewMessage("");
    scrollToBottom("#chat");
  }

  window.onkeydown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    setSocket(io("http://127.0.0.1:3000"));
    const urlSearch = new URLSearchParams(window.location.search);
    setUser(urlSearch.get("username"));
    setRoom(urlSearch.get("room"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("select_room", data => setUserList(data.roomUsers));

    socket.on("newuserlist", data => setUserList(data));

    socket.on("rooms", data => setRooms(data));

    socket.emit("select_room", { user, room }, (response) => {
      setUserList(response.users);
      setMessages(response.messages);
      scrollToBottom("#chat");
    });

    socket.on("message", (message) => setMessages(prevState => [...prevState, message]));
  }, [socket]);

  return (
    <>
      <GlobalStyle />
      <Header user={user} room={room} rooms={rooms} />
      <Main>
        <LeftContainer>
          <UserCardTitle>Online in this room</UserCardTitle>
          {userList.map((user, i) => <UserCard key={i}><OnlineIcon></OnlineIcon> {user.userName}</UserCard>)}
        </LeftContainer>
        <Chat id='chat'>
          <MessageWrapper>
            {Messages.map((message, i) => <Message content={message.content} key={i} sendUser={message.user} currentUser={user} time={message.time} />)}
          </MessageWrapper>
          <SendForm>
            <SendInput ref={sendMessageInput} placeholder="Write your message..." onChange={(event) => setNewMessage(event.target.value)} />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </SendForm>
        </Chat>
      </Main>
    </>
  )
}