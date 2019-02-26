const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const authenticate = require('./authenticate');
const router = require('./route/router');
const userRoute = require('./route/userRoute');

const hostname = 'localhost';
const port = 3000;

const url = 'mongodb://localhost:27017/sample';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('connected to the database');
},(err)=>{ console.log('err connecting to database' + err)});

const app = express();

//app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'main' , layoutDir: __dirname + '/views/layouts/'}));
//app.set('views', path.join(__dirname, 'views'));  
//app.set('view engine', 'hbs');

app.use(session({
    name : 'session-id',
    secret : 'harrypotter',
    saveUninitialized : false,
    resave : false,
    store : new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoute)

function auth(req,res,next) {
    if(!req.user)
    {
        var err = new Error('You are not authenticated1');
        err.status = 403;
        return next(err);
    }
    else
    {
        next();
    }
}
app.use(auth);

app.use('/',router);

app.listen(port , hostname, ()=>{
    console.log('server listening on ' + hostname + ' ' + port);
});
