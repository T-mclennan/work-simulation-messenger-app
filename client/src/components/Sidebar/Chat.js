import React, { Component } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../actions/activeConversationActions";
import { markConvoAsSeen } from '../../actions/thunkCreators'
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
  badge: {
    paddingRight: 35,
  }
};

class Chat extends Component {
  handleClick = async (conversation, messageId) => {
    await this.props.setActiveChat(conversation, messageId);
  };

  render() {
    const { classes, conversation } = this.props;
    const length = conversation.messages.length;
    const lastMessageId = length > 0 ? conversation.messages[length - 1].id : null;
    const otherUser = conversation.otherUser;
    const {unseenCount} = conversation;
    return (
      <Box
        onClick={() => this.handleClick(conversation, lastMessageId)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={conversation} />
        <Box className={classes.badge}>
          <Badge badgeContent={unseenCount} color="primary" max={999} />
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: ({otherUser, id}, messageId) => {
      id && dispatch(markConvoAsSeen(id, messageId, otherUser.id))
      dispatch(setActiveChat(otherUser.id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.id
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
