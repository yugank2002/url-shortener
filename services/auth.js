const { resolveInclude } = require('ejs');
const jwt = require('jsonwebtoken');
const key = 'Prajapati@2002';

const setUser = (user) =>{
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    },key);
    return token;
}

const getUser = (token) => {
    if(!token) return null;
    const user = jwt.verify(token,key);
    return user;
}

module.exports = {
    setUser,
    getUser
};