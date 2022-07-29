import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;
export const Main = styled.div`
    display: flex;
    height: 100vh;
    border-radius: 20px 20px 0px 0px;
`
export const ButtonFLoat = keyframes`
  0%, 100%{
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
`
export const LeftContainer = styled.div`
  left: 0;
  width: 18%;
  padding-top: 60px;
  min-width: 350px;
  background: #3F0F3F;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  border-radius: 25px 0px 0px 0px;
  @media(max-width: 1000px) {
    display: none
  }
`
export const SendForm = styled.div`
  position: fixed;
  bottom: 15px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  animation: ${ButtonFLoat} 5s linear infinite;
`
export const SendInput = styled.input`
  background: gray;

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
export const SendButton = styled.button`
  width: 80px;
  height: 40px;
  background: #6868eb;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 19px;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  margin-right: 600px;
  &:focus{
    outline: 0;
    border: 0;
  }
`
export const Chat = styled.div`
  border-radius:0px 25px 0px 0px;
  padding-top: 90px;
  background: #212020;
  width: 82%;
  padding: 60px;
  overflow: auto;
  background-image: url(https://i.kym-cdn.com/entries/icons/facebook/000/040/642/terrifiednootnoot.jpg);
  background-repeat: no-repeat;
  object-fit: cover;
  background-position: center;
  @media(max-width: 1000px) {
    width: 100%;
  }
`
export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
export const UserCardTitle = styled.h1`
  color: white;
`
export const UserCard = styled.h3`
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
`
export const OnlineIcon = styled.div`
    width: 9px;
    height: 9px;
    background: #56A97A
;
    border-radius: 50%;
`