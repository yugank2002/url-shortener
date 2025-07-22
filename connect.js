const mongoose = require('mongoose');

const connectDB = async(url) =>{
    await mongoose.connect(url)
    .then(()=>{
        console.log('Connected to MongoDB');
        const collections = mongoose.connection.collections;
        Object.values(collections).forEach((collection) => {
        console.log(`📦 Collection: ${collection.collectionName}`);
      });
    })
    .catch((err)=>{
        console.error('Error connecting to MongoDB:', err);
    })
}

module.exports = {
    connectDB
}