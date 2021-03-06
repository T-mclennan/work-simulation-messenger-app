import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, TypingMessage } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, typing, lastMessageReadId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastMessagePhoto = lastMessageReadId === message.id ? otherUser.photoUrl : null

        return message.senderId === userId ? (
          <SenderBubble 
            key={message.id} 
            text={message.text} 
            time={time} 
            lastMessagePhoto={lastMessagePhoto}
          />
        ) : (
          <OtherUserBubble 
            key={message.id} 
            text={message.text} 
            time={time} 
            otherUser={otherUser} 
          />
        );
      })}
      {typing && <TypingMessage otherUser={otherUser}/>}
    </Box>
  );
};

export default Messages;
