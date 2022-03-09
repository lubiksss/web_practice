const http = require('http');
const url = require('url');
const topic = require('./lib/topic');
const author = require('./lib/author');
const express = require('express')
const bodyParser = require("body-parser");
const {request} = require("express");
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
//route, routing
app.get('/', (request, response) => {
    topic.home(request, response);
})
app.get('/page/:pageId', (request, response) => {
    topic.page(request, response);
})
app.get('/create', (request, response) => {
    topic.create(request, response);
})
app.post('/create_process', (request, response) => {
    topic.create_process(request, response);
})
app.get('/update/:pageId', (request, response) => {
    topic.update(request, response);
})
app.post('/update_process', (request, response) => {
    topic.update_process(request, response);
})
app.post('/delete_process', (request, response) => {
    topic.delete(request, response);
})
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/*

var app = http.createServer(function (request, response) {
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            var pathname = url.parse(_url, true).pathname;

            } else if (pathname === '/author') {
                author.home(request, response);
            } else if (pathname === '/author/create_process') {
                author.create_process(request, response);
            } else if (pathname === '/author/update') {
                author.update(request, response);
            } else if (pathname === '/author/update_process') {
                author.update_process(request, response);
            } else if (pathname === '/author/delete_process') {
                author.delete_process(request, response);
            } else {
                response.writeHead(404);
                response.end('Page Not Found');
            }
        }
    )
;
app.listen(3000);
*/
