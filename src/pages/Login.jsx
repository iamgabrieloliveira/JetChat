import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { 
  GlobalStyle,
  Container,
  FormContainer,
  Input,
  RoomSelect,
  Button,
  FormGroup,
  CreateRoomInput,
  Label,
  Error,
} from "../style/login-style.js"

export default function Login() {

    const [socket, setSocket] = useState();
    const [rooms, setRooms] = useState();
    const [createRoomInput, setCreateRoomInput] = useState(false);
    const [newRoom, setNewRoom] = useState();
    const [userName, setUserName] = useState();
    const [users, setUsers] = useState();
    const [validator, setValidator] = useState("");

    const createRoomInputChange = () => setCreateRoomInput(current => !current);

    const createRoom = (event) => {
        if (socket) {
            let roomAlreadyExist = false;
            for (let room of rooms) {
                if (room === newRoom) {
                    event.preventDefault();
                    setValidator("Room already using...")
                    roomAlreadyExist = true;
                }
            }
            if (!roomAlreadyExist) {
                socket.emit("rooms", newRoom);
            }
        }
    };

    const formSubmit = (event) => {
        for (let user of users) {
            if (userName === user.userName) {
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
                    <Input onChange={(event) => setUserName(event.target.value)} required type="text" name="username" id="username" placeholder='Username' />
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