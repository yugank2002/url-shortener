const router = require('express').Router();
const {URL} = require('../model/url');
const {getUser}= require('../services/auth');

router.get('/', async(req,res) => {
   if(!req.user){
     return res.render('login');
   }
    const users = await URL.find({createdBy: req.user._id});
    
    res.render('home', {
        user:users
    });
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Signup'
    });
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
})

module.exports = router;