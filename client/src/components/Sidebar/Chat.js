import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../actions/activeConversationActions";
// import { setConversationAsSeen } from '../../actions/conversationActions'
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.id);
  };

  render() {
    const { classes, conversation } = this.props;
    const otherUser = conversation.otherUser;
    const {unseenCount} = conversation;
    return (
      <Box
        onClick={() => this.handleClick(conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={conversation} />

        {/****** TODO: style output ********/}
        {unseenCount > 0 && <h3>{unseenCount}</h3>}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
      // dispatch(setConversationAsSeen(id))
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
