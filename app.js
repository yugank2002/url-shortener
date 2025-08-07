require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const urlRouter = require('./routes/url');
const path = require('path');

const staticRoute = require('./routes/staticRoute');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const{restrictToLoggedInUsersOnly, onlyForAdmin, checkAuthentication} = require('./middlewares/auth');


const port = process.env.PORT;
const {connectDB} = require('./connect');

connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.locals.baseURL = req.protocol + "://" + req.get('host');
    next();
});




app.use('/',checkAuthentication, staticRoute);
app.use('/auth', authRouter);
app.use('/url', restrictToLoggedInUsersOnly , urlRouter);
app.use('/admin', onlyForAdmin, adminRouter);

app.listen(port, ()=>{
    console.log(`Server is Running  on Port ${port}`);
})