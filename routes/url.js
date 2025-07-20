const router = require('express').Router();
const {handleShortURL, handleRedirectURL} = require('../controller/url');

router.post('/', handleShortURL);

router.get('/:id', handleRedirectURL);

module.exports = router;