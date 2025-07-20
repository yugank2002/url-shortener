const express = require('express');
const app = express();
const urlRouter = require('./routes/url');
const path = require('path');
const staticRoute = require('./routes/staticRoute');
const port = 3000;
const {connectDB} = require('./connect');

connectDB('mongodb://localhost:27017/short-URL');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', staticRoute);
app.use('/url', urlRouter);

app.listen(port, ()=>{
    console.log(`Server is Running  on Port ${port}`);
})