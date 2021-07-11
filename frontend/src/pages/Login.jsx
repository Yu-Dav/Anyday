import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Header } from '../cmps/Header.jsx'
import Grid from '@material-ui/core/Grid';
import logo from '../assets/imgs/favicon/logo-192x192.png'
import { login } from '../store/actions/userActions'
import Typography from '@material-ui/core/Typography';

export const Login = () => {
    const [msg, setMsg] = useState('')
    const [loginCred, setLoginCred] = useState({
        username: '',
        password: ''
    })
    const users = useSelector(state => state.userModule.users)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const dispatch = useDispatch()

    const loginHandleChange = ev => {
        const { name, value } = ev.target
        setLoginCred(prevCred => ({ ...prevCred, [name]: value }))
    }

    const doLogin = async ev => {
        ev.preventDefault()
        const { username, password } = loginCred
        if (!username) {
            return setMsg('Please enter user/password')
        }
        const userCreds = { username, password }
        try {
            dispatch(login(userCreds))
            setLoginCred({ username: '', password: '' })
            window.location.hash = `/board/`
        } catch (err) {
            setMsg('Login failed, try again.')
            console.log('error is login', err);
        }
    }
    return (
        <div className="login-signup-container">
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="login-signup flex column" >
                    <img src={logo} alt="Logo" />
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form noValidate onSubmit={doLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="off"
                            autoFocus
                            onChange={loginHandleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={loginHandleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="">
                            Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );

}
