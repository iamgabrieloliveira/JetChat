import React from 'react';

import styled from "styled-components";

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`
const Container = styled.div`
    min-width: 300px;
    max-width: 300px;
    min-height: 50px;
    background: white;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MessageContent = styled.p`
  color: black;
  padding: 10px;
`
const MessageFooter = styled.p`
    padding: 5px 10px;
    background: antiquewhite;
    margin-top: 20px;
    border-radius: 0px 0px 5px 5px;
    color: black;
`
const MessageHeader = styled.p`
    padding: 5px 10px;
    border-radius: 5px 5px 0px 0px;
    background: antiquewhite;
    color: black;
`

export function Message(props) {

   let position =  props.currentUser === props.sendUser ? "end" : "start";

    return(
        <MessageWrapper style={{justifyContent: position}}>
            <Container>
                <MessageHeader>
                    {props.sendUser}
                </MessageHeader>
                <MessageContent>
                    {props.content}
                </MessageContent>
                <MessageFooter>
                    {props.time}
                </MessageFooter>
            </Container>
        </MessageWrapper>
    )
}

