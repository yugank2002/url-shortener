const router = require('express').Router();
const {URL} = require('../model/url');

router.get('/', async(req,res) => {
    const users = await URL.find({});
    console.log(users);
    res.render('home', {
        user:users
    });
})

module.exports = router;