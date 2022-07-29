import React from 'react';
import {
  Container, 
  Title, 
  ChangeRoomForm, 
  ChangeRoomSelect, 
  ChangeRoomButton,
  MacIcon,
  MacIcons,
} from '../style/header-style';

export function Header(props) {
  let roomsList = props.rooms ? props.rooms : [];

  let selectedInput = document.querySelector(`option[value="${props.room}"]`);
  if (selectedInput) selectedInput.setAttribute("selected", "selected");

  return (
    <Container>
      <MacIcons>
        <MacIcon style={{background: "#ED6A5E"}}/>
        <MacIcon style={{background: "#F4BD4F"}}/>
        <MacIcon style={{background: "#61C354"}}/>
      </MacIcons>
      <Title>Jet Chat</Title>
      <Title>Hello, {props.user}</Title>
      <Title>You are in the: {props.room} room</Title>
      <ChangeRoomForm action="http://localhost:5173/home">
        <ChangeRoomSelect name="room" id="room">
          {roomsList.map(room => <option value={room}>{room}</option>)}
        </ChangeRoomSelect>
        <input type="text" style={{ display: "none" }} name="username" id="user" value={props.user} />
        <ChangeRoomButton type='submit'>Change</ChangeRoomButton>
      </ChangeRoomForm>
    </Container>
  )
}