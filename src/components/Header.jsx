import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #212020;
  height: 50px;
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #230505;
  align-items: center;
`
const Button = styled.button`
    background: white;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    transition: .6s;
    &:hover {
    background: black;
    color: white;
      transform: translateY(5px);
    }  
`
const Title = styled.h1`
    color: white;
    font-size: 22px;
`
const SearchInput = styled.input`
  background: white;
  width: 200px;
  margin-top: 10px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  transition: .6s;
  padding-left: 8px;
  &:hover {
    transform: translateY(5px);
  }
  &:focus{
    outline: 0;
    border: 0;
  }
`
const ChangeRoomForm = styled.form`

`

const ChangeRoomSelect = styled.select`
  padding: 5px 12px;
  border-radius: 10px 0px 0px 10px;
  background: white;
  border: 0;
  height: 34px;
  &:focus{
    outline: 0;
  }
`

const ChangeRoomButton  = styled.button`
  padding: 5px 12px;
  border-radius: 0px 10px 10px 0px;
  background: #ff3636;
  border: 0;
  height: 34px;
  color: white;
  font-weight: normal;
  cursor: pointer;
  transition: 6s;
  &:hover{
    opacity: .7;
  }
`

export function Header(props) {

  let roomsList = props.rooms ? props.rooms : []

  return (
    <Container>
      <Title>Jet Chat</Title>
      <Title>Hello, {props.user}</Title>
      <Title>You are in the: {props.room} room</Title>
      <ChangeRoomForm action="http://localhost:5173/home">
        <ChangeRoomSelect name="room" id="room">
          { roomsList.map((room, i) => <option  value={room}>{room}</option>) }
        </ChangeRoomSelect>
        <input type="text" style={{display: "none"}} name="username" id="user" value={props.user}/>
        <ChangeRoomButton type='submit'>Change</ChangeRoomButton>
      </ChangeRoomForm>
      {/* <SearchInput placeholder="Search" /> */}
    </Container>
  )
}