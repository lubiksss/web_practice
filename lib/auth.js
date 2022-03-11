const db = require("./db");
const template = require("./template");
const url = require("url");
const qs = require("querystring");
const bodyParser = require('body-parser');
const {auth} = require("mysql/lib/protocol/Auth");

var authData = {
    email: 'lubiksss@gmail.com',
    password: '1234',
    nickname: 'jake'
}

exports.login = function (request, response) {
    var title = 'WEB-login';
    var html = template.html(title, '',
        `<form action="/login_process" method="post">
                                <p><input name="email" type="text" placeholder="email"></p>
                                <p><input name="password" type="password" placeholder="password"></p>
                                <p><input type="submit" value="login"></p>
                        </form>`, '');
    response.send(html);
};
exports.login_process = function (request, response) {
    var post = request.body;
    var email = post.email;
    var password = post.password;
    if (email === authData.email && password === authData.password) {
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        request.session.save(function () {
            response.redirect('/');
        });
    } else {
        response.send('Failed Login');
    }
};
exports.logout = function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
};
