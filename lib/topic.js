const db = require("./db");
const template = require("./template");
const url = require("url");
const qs = require("querystring");
const bodyParser = require('body-parser');
const {auth} = require("mysql/lib/protocol/Auth");

function isLogined(request) {
    if (request.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

exports.home = function (request, response) {
    var authStatusUI = '<a href="/login">login</a>';
    if (isLogined(request)) {
        authStatusUI = '<a href="/logout">logout</a>';
    }
    db.query(`SELECT *
              FROM topic`, function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.html(title, list,
            `<h2>${title}</h2><p>${description}</p>`,
            `<a href="/create">create</a>`,
            authStatusUI);
        response.send(html);
    });
};

exports.page = function (request, response) {
    var queryData = request.params.pageId;
    db.query(`SELECT *
              FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT *
                  FROM topic
                           LEFT JOIN author ON topic.author_id = author.id
                  WHERE topic.id = ?`, [queryData], function (error2, topic) {
            if (error2) {
                throw error2;
            }
            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.html(title, list,
                `<h2>${title}</h2><p>${description}</p><p>by ${topic[0].name}</p>`,
                `<a href="/create">create</a>
                                         <a href="/update/${queryData}">update</a>
                                         <form action="/delete_process" method="post">
                                             <input type="hidden" name="id" value="${queryData}">
                                             <input type="submit" value="delete">
                                         </form>`);
            response.send(html);
        });
    });
};

exports.create = function (request, response) {
    db.query(`SELECT *
              FROM topic`, function (error, topics) {
        db.query('SELECT * FROM author', function (error2, authors) {
            var title = 'Create';
            var list = template.list(topics);
            var html = template.html(title, list,
                `<form action="/create_process" method="post">
                                <p><input name="title" type="text" placeholder="title"></p>
                                <p>
                                ${template.authorSelect(authors)}
                                </p>
                                <p>
                                    <textarea cols="30" id="" name="description" rows="10" placeholder="description"></textarea>
                                </p>
                                <p>
                                    <input type="submit">
                                </p>
                                </form>`,
                `<a href="/create">create</a>`);
            response.send(html);
        });
    });
};

exports.create_process = function (request, response) {
    var post = request.body;
    db.query(`INSERT INTO topic (title, description, created, author_id)
              VALUES (?, ?, NOW(), ?)`,
        [post.title, post.description, post.author], function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect(`/page/${result.insertId}`);
        });
};

exports.update = function (request, response) {
    var queryData = request.params.pageId;
    db.query(`SELECT *
              FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(`SELECT *
                  FROM topic
                  WHERE id = ?`, queryData, function (error2, topic) {
            if (error2) {
                throw error2;
            }
            db.query('SELECT * FROM author', function (error2, authors) {
                var list = template.list(topics);
                var html = template.html(topic[0].title, list,
                    `
                                <form action="/update_process" method="post">
                                <input type="hidden" name="id" value="${topic[0].id}">
                                <p><input name="title" type="text" placeholder="title" value="${topic[0].title}"></p>
                                <p>
                                    ${template.authorSelect(authors, topic[0].author_id)} 
                                </p>
                                <p>
                                    <textarea cols="30" id="" name="description" rows="10" placeholder="description">${topic[0].description}</textarea>
                                </p>
                                <p>
                                <input type="submit">
                                </p>
                                </form>
                            `
                    ,
                    `<a href="/create">create</a> <a href="/update/${topic[0].id}">update</a>`);
                response.send(html);
            });
        });

    });
};

exports.update_process = function (request, response) {
    var post = request.body;
    db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?', [post.title, post.description, post.author, post.id], function (error, result) {
        response.redirect(`/page/${post.id}`);
    })
};

exports.delete = function (request, response) {
    var post = request.body;
    db.query('DELETE FROM topic WHERE id = ?', [post.id], function (error, result) {
        if (error) {
            throw error;
        }
        response.redirect(`/`);
    });
};
