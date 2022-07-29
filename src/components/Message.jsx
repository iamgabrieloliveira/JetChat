import React from 'react';
import {
  MessageWrapper,
  Container,
  MessageContent,
  MessageFooter,
  MessageHeader
} from "../style/message-style.js"

export function Message(props) {

    let position = props.currentUser === props.sendUser ? "end" : "start";

    return (
        <MessageWrapper style={{ justifyContent: position }}>
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

