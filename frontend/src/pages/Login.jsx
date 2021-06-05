import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Header } from '../cmps/Header.jsx'
import logo from '../assets/imgs/favicon/logo-192x192.png'
import { connect } from 'react-redux'
import { loadUsers, login, removeUser, signup, logout } from '../store/actions/userActions'

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

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
        console.log('dologin');
        const { username, password } = this.state.loginCred
        console.log(this.state);
        if (!username) {
            return this.setState({ msg: 'Please enter user/password' })
        }
        const userCreds = { username, password }
        console.log(userCreds);
        try {
            this.props.login(userCreds)
            this.setState({ loginCred: { username: '', password: '' } }, console.log(this.state))
            const boardId = '60b7e87419a5e8e764d835fe'
            window.location.hash = `/board/${boardId}`
        } catch (err) {
            this.setState({ msg: 'Login failed, try again.' })
            console.log('error is login', err);
        }
    }
    render() {
        // const classes = useStyles();
        return (
            <>
                <Header />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    {/* <div className={classes.paper}> */}
                    <div className="login-page" >
                        <img src={logo} alt="Logo" />
                        <h1>Sign in</h1>
                        {/* <form className={classes.form} noValidate> */}
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
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className=""
                            // className={classes.submit}
                            >
                                Sign In
                </Button>

                        </form>
                    </div>

                </Container>
            </>
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