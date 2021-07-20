import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import AuthLayout from "../components/Layout/AuthLayout";
import {useAuthStyles} from "../themes/theme";
import { register } from "../actions/thunkCreators";

const Login = (props) => {

  const classes = useAuthStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout>
      <Grid item xs={12} sm={7} md={7}>
        <Box className={classes.pageContainer}>
          <Box className={classes.headerBox}>
            <Typography className={classes.accentText}>Already have an account?</Typography>
            <Button className={classes.navButton} onClick={() => history.push("/login")}>
              Login
            </Button>
          </Box>
          <Box className={classes.contentBox} mt={8}>
            <Box>
              <Typography className={classes.boldStatementText}>
                Create an account.
              </Typography>
            </Box>
            <form onSubmit={handleRegister}>
              <Grid >
                <Box my={1}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Box>
                <Box my={1}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Box>
                <Box my={1}>
                  <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                    <TextField
                      fullWidth
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box my={1}>
                  <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box mt={5} textAlign='center'>
                  <Button type="submit" variant="contained" className={classes.actionButton}>
                      <strong>Create</strong>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
