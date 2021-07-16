import React, { Component } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../actions/thunkCreators";
import {broadcastTypingAction} from "../../socket"

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleOnBlur = () => {
    const {otherUser, conversationId} = this.props;
    broadcastTypingAction(conversationId, otherUser.id, 'stoppedTyping')
  }

  handleOnFocus = () => {
    const {otherUser, conversationId} = this.props;
    broadcastTypingAction(conversationId, otherUser.id, 'isTyping')
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {otherUser, conversationId, user, postMessage} = this.props;
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };

    await postMessage(reqBody);

    this.setState({
      text: "",
    });
  };

  // broadcastTypingAction (convoId, recepientId, action) => {

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
            onFocus={this.handleOnFocus}
          />
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
