var express = require('express')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()
var fileStoreOptions = {};

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(fileStoreOptions)
}))


app.get('/', function (req, res, next) {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views: ${req.session.num}`);
})

app.listen(3030, () => {
    console.log(3030)
})
