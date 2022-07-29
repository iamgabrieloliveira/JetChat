import styled, { keyframes } from "styled-components";

export const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`
export const ButtonFLoat = keyframes`
  0%, 100%{
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
`
export const Container = styled.div`
    min-width: 300px;
    max-width: 300px;
    min-height: 50px;
    background: #fafaf4;
    box-shadow: 3px 3px 0px 2px black;
    border-radius: 5px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${ButtonFLoat} 5s linear infinite;

`
export const MessageContent = styled.p`
  color: black;
  padding: 10px;
`
export const MessageFooter = styled.p`
    padding: 5px 10px;
    background: #fafaf4;
    margin-top: 20px;
    color: black;
    border-radius: 0px 0px 5px 5px;
`
export const MessageHeader = styled.p`
    padding: 5px 10px;
    border-radius: 5px 5px 0px 0px;
    background: #fafaf4;
    font-weight: bold;
    color: black;
`