const {URL} = require('../model/url');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

const handleShortURL = async(req,res)=>{
    const requestedURL = req.body.originalURL;
    const id = shortid.generate();
    if(!requestedURL){
        return res.status(400).json({error: 'URL is required'});
    }
    
    await URL.create({
        shortID: id,
        originalURL: requestedURL,
        visited:[],
        createdBy: req.user._id,
        createdByName: req.user.email
    })

    return res.status(200).render('home', {
        newURL: `${req.protocol + "://" + req.get('host')}/url/${id}`
        
    })
}

const handleRedirectURL = async(req, res) => {
    const shortid = req.params.id;
    const url = await URL.findOneAndUpdate(
        {shortID: shortid},
        {$push:{visited:{timestamp:Date.now()}}},
        {new:true}

    )
    .then((url)=>{
        if(!url){
            return res.status(404).json({error: 'URL not found'});
        }   
     
        
        fs.appendFile(path.resolve(__dirname, '../log.txt'), `${Date.now()}  -  ${url.originalURL}\n`, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            } else {
                console.log('Log updated successfully');
            }
        });
        
        return res.redirect(url.originalURL);
    })

    
}

module.exports={
    handleShortURL,
    handleRedirectURL
}