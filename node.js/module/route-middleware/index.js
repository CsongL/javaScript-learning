// 可以在处理一个请求的过程中加很多中间件，从而实现对每一个请求的精细处理，而加载中间价的方式就是加函数
// 中间件 其实就是一个个函数

import express from 'express';

const app = express();

const users = [
    { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' }
    , { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' }
    , { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];

function loadUser(req, res, next) {
    let user = users[req.params.id];
    if(user) {
        req.user = user;
        next();
    } else {
        next(new Error('User not found'));
    }
}

function andRestrictToSelf(req, res, next) {
    if(req.authenticatedUser.id === req.user.id) {
        next();
    } else {
        next(new Error('Unauthorized'));
    }
}

function andRestrictTo(role) {
    return function(req, res, next) {
        if(req.authenticatedUser.role === role) {
            next();
        }else {
            next(new Error('Unauthorized'));
        }
    };
}

app.use(function(req, res, next) {
    req.authenticatedUser = users[0];
    next();
});

app.get('/', function(req, res) {
    req.redirect('/user/0');
});

app.get('/user/:id', loadUser, function(req, res) {
    res.send('Viewing users ' + req.user.name);
});

app.get('/user/:id/edit', loadUser, andRestrictToSelf, function(req, res) {
    res.send('Editing user' + req.user.name);
});

app.delete('/user/:id', loadUser, andRestrictTo('admin'), (req, res) => {
    res.send('Deleting user' + req.user.name);
});

app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});