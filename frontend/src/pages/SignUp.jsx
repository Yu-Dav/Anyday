import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import logo from '../assets/imgs/favicon/logo-192x192.png'
import { Header } from '../cmps/Header.jsx'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { signup } from '../store/actions/userActions'

export const SignUp = () => {

  const [msg, setMsg] = useState('')
  const [loginCred, setLoginCred] = useState({
    fullName: '',
    username: '',
    password: ''
  })
  const users = useSelector(state => state.userModule.users)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const dispatch = useDispatch()
  const HandleChange = (ev) => {
    const { name, value } = ev.target
    setLoginCred(prevCred => ({ ...prevCred, [name]: value }))
  }

  const onSignup = async (ev) => {
    ev.preventDefault()
    const { username, password, fullname } = loginCred
    if (!username || !password || !fullname) {
      return setMsg('Please enter user/password')
    }
    const userCreds = { username, password, fullname }
    try {
      dispatch(signup(userCreds))
      setLoginCred({ username: '', fullname: '', password: '' })
    } catch (err) {
      setMsg('signup failed, try again.')
      console.log('error is signup', err);
    }
    window.location.hash = `/board`
  }

  return (
    <div className="login-signup-container">
      <Header />
      <div className="login-signup" >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <img src={logo} alt="Logo" style={{ display: "inherit" }} />
          <Typography component="h1" variant="h5" align="center">
            Sign up
          </Typography>
          <form noValidate onSubmit={onSignup}>
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
                  onChange={HandleChange}
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
                  onChange={HandleChange}
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
                  onChange={HandleChange}
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
