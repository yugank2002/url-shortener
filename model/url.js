const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    shortID:{
        type: String,
        required: true
    },
    originalURL:{
        type: String,
        required: true
    },
    visited: [
       {
           timeStamp:{
            type: Date,
            default: Date.now
           } 
       }
    ]

})

const URL = mongoose.model('url', urlSchema);

module.exports = {
    URL
};