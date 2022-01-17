import express from 'express';

const app = express();

const users = [
    {name: 'cai'},
    {name: 'meng'},
    {name: 'wang'}
];

function createError(status, message) {
    let err = new Error(message);
    err.status = status;
    return err;
}

app.param(['to', 'from'], function(req, res, next, num, name) {
    req.params[name] = parseInt(num, 10);
    if(isNaN(req.params[name])) {
        next(createError(404, 'failed to parseInt' + num));
    } else {
        next();
    }
});

app.param('user', function(req, res, next ,id) {
    console.log(id);
    if(req.user = users[id]) {
        next();
    } else{
        next(createError(404, 'failed to find user'));
    }
});



app.get('/', function(req, res) {
    res.send('Visit user/0 or users/0-2');
});

app.get('/user/:user', function(req, res) {
    let name = req.user.name;
    res.send('user ' + name);
});

app.get('/users/:from-:to', function(req, res) {
    let from = req.params.from;
    let to = req.params.to;
    let names = users.map(function(user) {
        return user.name;
    });
    res.send('user: ' + names.slice(from, to+1).join(','));
});

app.listen(3000, function() {
    console.log('The app is listen on port 3000');
})
