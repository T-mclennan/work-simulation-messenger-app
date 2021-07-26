import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
    height: '65vh',
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  },
  userBox: {
    height: '100%',
    overflowY: 'auto',
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm, handleLogout } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser handleLogout={handleLogout}/>
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      <Box className={classes.userBox}>
        {conversations
          .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
          .map((conversation) => {
            return <Chat conversation={conversation} key={conversation.otherUser.id} />;
          })}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
