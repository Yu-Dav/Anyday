import logo from '../assets/imgs/favicon/logo-192x192.png'
import { Header } from '../cmps/Header.jsx'
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Component } from 'react';
import { connect } from 'react-redux'
import { loadUsers, login, removeUser, signup, logout } from '../store/actions/userActions'

class _SignUp extends Component {

  state = {
    msg: '',
    loginCred: {
      fullName: '',
      username: '',
      password: ''
    },
  }

  HandleChange = (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  onSignup = async (ev) => {
    ev.preventDefault()
    console.log('signup');
    const { username, password, fullname } = this.state.loginCred
    console.log(this.state);
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password, fullname }
    console.log(userCreds);
    try {
      this.props.signup(userCreds)
      this.setState({ loginCred: { username: '', fullname: '', password: '' } }, console.log(this.state))
    } catch (err) {
      this.setState({ msg: 'signup failed, try again.' })
      console.log('error is signup', err);
    }
    window.location.hash = `/board`
  }
  render() {

    return (
      <div className="login-signup-container">
        <Header />
        <div className="login-signup" >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <Container> */}

            <img src={logo} alt="Logo" style={{ display: "inherit"}} />
            <Typography component="h1" variant="h5" align="center">
              Sign up
            </Typography>
            {/* </Container> */}
            <form noValidate onSubmit={this.onSignup}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fullname"
                    name="fullname"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    onChange={this.HandleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    onChange={this.HandleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.HandleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary">
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={5}>
            </Box>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
}
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)