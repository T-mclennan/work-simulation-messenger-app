import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import Loader from 'react-loader-spinner';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    width: 80,
    paddingLeft: 20,
    paddingTop: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const Messages = (props) => {
  const classes = useStyles();
  const { otherUser} = props;
  return (
    <Box>
      <Box className={classes.root}>
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
        <Box>
          <Typography className={classes.usernameDate}>
            {otherUser.username}
          </Typography>
          <Box className={classes.bubble}>
            <Loader type="ThreeDots" color="rgba(249, 249, 249, 0.8)" height={25} width={40} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
