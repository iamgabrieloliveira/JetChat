import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { Header } from "../components/Header";
import { Message } from "../components/Message";
import { io } from 'socket.io-client';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const Main = styled.div`
    display: flex;
`

const LeftContainer = styled.div`
  left: 0;
  width: 18%;
  background: #2f2d2d;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  padding-top: 24px;
`
const SendForm = styled.div`
  position: fixed;
  bottom: 9px;
  display: flex;
  align-items: center;
`
const SendInput = styled.input`
  background: gray;

  margin-left: 800px;
  width: 400px;
  height: 40px;
  background: white;
  border: none;
  border-radius: 10px 0px 0px 10px;
  color: black;
  font-size: 20px;
  padding-left: 8px;
  &:focus{
    outline: 0;
    border: 0;
  }
`
const SendButton = styled.button`
  width: 80px;
  height: 40px;
  background: blue;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 19px;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  &:focus{
    outline: 0;
    border: 0;
  }
`

const Chat = styled.div`
  background: #212020;
  width: 82%;
  padding: 60px;
  height: 780px;
  overflow: auto;
`
const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const UserCardTitle = styled.h1`
  color: white;
`
const UserCard = styled.h3`
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
`
const OnlineIcon = styled.div`
    width: 9px;
    height: 9px;
    background: green;
    border-radius: 50%;
`

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
    let minutes = today.getMinutes().toString().length === 1 ? "0" + today.getMinutes().toString() : today.getMinutes().toString()
    let time = today.getHours() + ":" + minutes

    const message = {
      content: NewMessage,
      user,
      time,
      room,
    }

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
    socket.on("select_room", (data) => setUserList(data));

    socket.on("newuserlist", (data) => setUserList(data));

    socket.on("rooms", (data) => setRooms(data));

    socket.emit("select_room", {
      user,
      room
    }, (response) => {
      setUserList(response.users)
      setMessages(response.messages)
      scrollToBottom("#chat")
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
            <SendButton onClick={sendMessage}>
              Send
            </SendButton>
          </SendForm>
        </Chat>
      </Main>
    </>
  )
}