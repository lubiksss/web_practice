var http = require('http');
var fs = require('fs');
var url = require('url');
const path = require("path");

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id == undefined) {
            var title = 'welcome';
            var article = "Hello NodeJS"
            var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            <link href="style.css" rel="stylesheet">
            <script src="colors.js"></script>
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <input onclick="nightDayHandler(this)" type="button" value="night">
            <div id="grid">
            <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JAVASCRIPT">JavaScript</a></li>
            </ol>
            <div id="article">

            <h2>${title}</h2>
            <p>${article}</p>
            </div>
            </div>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
        } else {
            var title = queryData.id;
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, article) {
                var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            <link href="style.css" rel="stylesheet">
            <script src="colors.js"></script>
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <input onclick="nightDayHandler(this)" type="button" value="night">
            <div id="grid">
            <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JAVASCRIPT">JavaScript</a></li>
            </ol>
            <div id="article">

            <h2>${title}</h2>
            <p>${article}</p>
            </div>
            </div>
            </body>
            </html>
            `;
                response.writeHead(200);
                response.end(template);
            });
        }
    } else {
        response.writeHead(404);
        response.end('Page Not Found');
    }


});
app.listen(3000);
