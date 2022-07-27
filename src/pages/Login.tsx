import react from 'react';
import styled from 'styled-components';

const FormContainer  = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 350px;
    border: 1px solid black;
    padding: 14px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Login()
{
    return (
        <FormContainer action="http://localhost:5173/home">
            <input type="text" name="username" id="username"/>
            <button type='submit'>Login</button>
        </FormContainer>
    )   
}