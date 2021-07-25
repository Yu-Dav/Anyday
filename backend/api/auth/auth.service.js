const bcrypt = require('bcrypt')
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`);

    const user = await userService.getByUsername(username);
    if (!user) {
        console.log('line 10 Auth service - wrong cred!!!!')
        return Promise.reject('Invalid username or password');
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
    delete user.password;
    return user;
}

async function signup(username, password, fullname) {
    let saltRounds = await bcrypt.genSalt(10)
    logger.debug(
        `auth.service - signup with username: ${username}, fullname: ${fullname}`
    );
    if (!username || !password || !fullname)
        return Promise.reject('fullname, username and password are required!');

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname })
}

module.exports = {
    signup,
    login,
};
