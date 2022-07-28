import react, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { io } from 'socket.io-client';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: #232424;
`

const FormContainer = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 250px;
    border: 1px solid black;
    padding: 14px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    background-color: #fcfcfc;
`
const Input = styled.input`
    width: 250px;
    height: 30px;
    padding-left: 6px;
    border: 0;
    border-bottom: 1px solid black;
    font-size: 15px;
    &:focus{
        outline: 0;
        background: none;
    }
`
const RoomSelect = styled.select`
    width: 250px;
    height: 30px;
    border: 0;
    border-bottom: 1px solid black;
    background: white;
    &:focus{
        outline: 0;
    }
`
const Button = styled.button`
    width: 250px;
    height: 40px;

    background: #4080da;

    border: none;
    border-radius: 5px;

    color: white;

    cursor: pointer;
    transition: .3s;
    &:hover{
        opacity: .7;
    }
`
const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;    
`
const CreateRoomInput = styled.span`
    color: blue;
    cursor: pointer;
`
const Label = styled.label`
    font-size: 16px;
    margin-bottom: 10px;
    margin-left: 4px;
`
const Error = styled.h2`
    background: #ff3333;
    padding: 10px 20px;
    border-radius: 5px;
    width: 69%;
    text-align: center;
    font-weight: normal;
    color: white;
    font-size: 17px;
`

export default function Login() {

    const [socket, setSocket] = useState();
    const [rooms, setRooms] = useState();
    const [createRoomInput, setCreateRoomInput] = useState(false);
    const [newRoom, setNewRoom] = useState();
    const [userName, setUserName] = useState();
    const [users, setUsers] = useState();
    const [validator, setValidator] = useState("");

    const createRoomInputChange = () => setCreateRoomInput(current => !current);

    const createRoom = () => {if(socket) socket.emit("rooms", newRoom)};

    const formSubmit = (event) => {
        for(let user of users) {
            if(userName === user.userName) {
                event.preventDefault();
                setValidator("Username already using...")
            }
        }
    }

    useEffect(() => setSocket(io("http://127.0.0.1:3000")), [])

    useEffect(() => {
        if (!socket) return;
        socket.on("rooms", rooms => setRooms(rooms));

        socket.on("users", data => setUsers(data));
    }, [socket])

    return (
        <Container>
            <FormContainer action="http://localhost:5173/home" onSubmit={formSubmit}>
                <GlobalStyle />
                <h1>JetChat</h1>
                <FormGroup>
                    <Input onChange={(event) => setUserName(event.target.value)} type="text" name="username" id="username" placeholder='Username' />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="room">Create room or,  <CreateRoomInput onClick={createRoomInputChange}>choose</CreateRoomInput></Label>
                    {
                        createRoomInput
                            ?
                            <RoomSelect name="room" id="room">
                                {
                                    rooms.map((room, i) => <option value={room} key={i}>{room}</option>)
                                }
                            </RoomSelect>
                            :
                            <Input onChange={(event) => setNewRoom(event.target.value)} required type="text" name="room" placeholder="Room name..." />
                    }
                </FormGroup>
                <Button type='submit' onClick={createRoom}>Login</Button>
                {validator ? <Error>{validator}</Error> : null}
            </FormContainer>
        </Container>

    )
}