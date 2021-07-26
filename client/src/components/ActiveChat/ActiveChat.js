import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    height: '65vh',
    overflow: 'auto'
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, conversations, activeConversationUserId } = props;
  const conversation = conversations.find(
    (conversation) => conversation.otherUser.id === activeConversationUserId
  ) || {}
  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              lastMessageReadId={conversation.lastMessageReadId}
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              typing={conversation.isTyping}
            />
          </Box>
          <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    activeConversationUserId: state.activeConversationUserId,
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
