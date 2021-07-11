import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Header } from '../cmps/Header.jsx'
import Grid from '@material-ui/core/Grid';
import logo from '../assets/imgs/favicon/logo-192x192.png'
import { connect } from 'react-redux'
import { loadUsers, login, removeUser, signup, logout } from '../store/actions/userActions'
import Typography from '@material-ui/core/Typography';

class _Login extends Component {
    state = {
        msg: '',
        loginCred: {
            username: '',
            password: ''
        },
    }
    loginHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }))
    }
    doLogin = async ev => {
        ev.preventDefault()
        // console.log('dologin');
        const { username, password } = this.state.loginCred
        // console.log(this.state);
        if (!username) {
            return this.setState({ msg: 'Please enter user/password' })
        }
        const userCreds = { username, password }
        // console.log(userCreds);
        try {
            await this.props.login(userCreds)
            this.setState({ loginCred: { username: '', password: '' } }, console.log(this.state))
            window.location.hash = `/board/`
        } catch (err) {
            this.setState({ msg: 'Login failed, try again.' })
            console.log('error is login', err);
        }
    }
    render() {
        return (
            <div className="login-signup-container">
                <Header />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    {/* <div className={classes.paper}> */}
                    <div className="login-signup flex column" >
                        <img src={logo} alt="Logo" />
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.doLogin}>
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
                                onChange={this.loginHandleChange}
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
                                onChange={this.loginHandleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="">
                                Sign In
                            </Button>
                            {this.state.msg}
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
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
        // isLoading: state.systemModule.isLoading
    }
}

const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers
}
export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)