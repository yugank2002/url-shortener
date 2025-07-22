const {handleUserSignup, handleUserLogin, handleUserLogout} = require('../controller/auth');
const router = require('express').Router();

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);

router.post('/logout', handleUserLogout );

module.exports = router;