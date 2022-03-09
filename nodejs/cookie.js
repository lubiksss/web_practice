const cookie = require('cookie');

const http = require('http');
http.createServer(function (req, res) {
    console.log(req.headers.cookie);
    let cookies = {};
    if (req.headers.cookie !== undefined) {
        cookies = cookie.parse(req.headers.cookie)
        console.log(cookies);
    }
    res.writeHead(200, {
        'Set-Cookie': ['yummy_cooke=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`,
            'secure=secure; Secure']
    });
    res.end('Cookie!');
}).listen(3000);
