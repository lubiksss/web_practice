const topic = require('./lib/topic');
const auth = require('./lib/auth');
const express = require('express')
const bodyParser = require("body-parser");
const compression = require('compression')
const helmet = require('helmet')
const app = express()
const port = 3000
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const fileStoreOptions = {};
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(fileStoreOptions)
}))

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(helmet());


//route, routing
app.get('/', (req, res) => {
    topic.home(req, res);
})
app.get('/page/:pageId', (req, res) => {
    topic.page(req, res);
})
app.get('/create', (req, res) => {
    topic.create(req, res);
})
app.post('/create_process', (req, res) => {
    topic.create_process(req, res);
})
app.get('/update/:pageId', (req, res) => {
    topic.update(req, res);
})
app.post('/update_process', (req, res) => {
    topic.update_process(req, res);
})
app.post('/delete_process', (req, res) => {
    topic.delete(req, res);
})
app.get('/login', (req, res) => {
    auth.login(req, res);
})
app.post('/login_process', (req, res) => {
    auth.login_process(req, res);
})
app.get('/logout', (req, res) => {
    auth.logout(req, res);
})
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/*

var app = http.createServer(function (req, res) {
            var _url = req.url;
            var queryData = url.parse(_url, true).query;
            var pathname = url.parse(_url, true).pathname;

            } else if (pathname === '/author') {
                author.home(req, res);
            } else if (pathname === '/author/create_process') {
                author.create_process(req, res);
            } else if (pathname === '/author/update') {
                author.update(req, res);
            } else if (pathname === '/author/update_process') {
                author.update_process(req, res);
            } else if (pathname === '/author/delete_process') {
                author.delete_process(req, res);
            } else {
                res.writeHead(404);
                res.end('Page Not Found');
            }
        }
    )
;
app.listen(3000);
*/
