import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
`;
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #232424;
`
export const FormContainer = styled.form`
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
export const Input = styled.input`
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
export const RoomSelect = styled.select`
  width: 250px;
  height: 30px;
  border: 0;
  border-bottom: 1px solid black;
  background: white;
  &:focus{
      outline: 0;
  }
`
export const Button = styled.button`
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
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;    
`
export const CreateRoomInput = styled.span`
  color: blue;
  cursor: pointer;
`
export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  margin-left: 4px;
`
export const Error = styled.h2`
  background: #ff3333;
  padding: 10px 20px;
  border-radius: 5px;
  width: 69%;
  text-align: center;
  font-weight: normal;
  color: white;
  font-size: 17px;
`