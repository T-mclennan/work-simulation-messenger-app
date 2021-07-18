import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Box
} from "@material-ui/core";
import AuthLayout from "../components/Layout/AuthLayout";
import {useAuthStyles} from '../themes/theme';
import { login } from "../actions/thunkCreators";

const Login = (props) => {
  const history = useHistory();
  const classes = useAuthStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout>
      <Grid item xs={12} sm={7} md={7}>
        <Box className={classes.pageContainer}>
          <Box className={classes.headerBox}>
            <Typography className={classes.accentText}>Don't have an account?</Typography>
            <Button className={classes.navButton} onClick={() => history.push("/register")}>
              Create Account
            </Button>
          </Box>
          <Box className={classes.contentBox}>
            <Box>
              <Typography style={{fontWeight: "bold", fontSize: 30}}>
                Welcome Back!
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <Grid style={{margin: 1}}>
                <FormControl margin="normal" fullWidth required>
                  <Typography className={classes.accentText}>username</Typography>
                  <TextField
                    fullWidth
                    aria-label="username"
                    name="username"
                    type="text"
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                  <Typography className={classes.accentText}>password</Typography>
                  <TextField
                    fullWIdth
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Box textAlign='center'>
                  <Button type="submit" variant="contained" className={classes.actionButton}>
                      <strong>Login</strong>
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
