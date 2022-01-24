import express from 'express';
import escapeHtml from 'escape-html';

const app = express();

app.map = function(a, route) {
    route = route || '';
    for(let key in a) {
        switch(typeof a[key]) {
            case 'object':
                app.map(a[key], route + key);
                break;
            case 'function':
                console.log('%s %s', key, route)
                app[key](route, a[key]);
                break;
        }
    }
};

const users = {
    list: function(req, res) {
        res.send('user list');
    },
    get: function(req, res) {
        res.send('user' + escapeHtml(req.params.uid));
    },
    delete: function(req, res) {
        res.send('delete user: ');
    }
};

const pets = {
    list: function(req, res) {
        res.send('pets list');
    },
    delete: function(req, res) {
        res.send('delete ' +  escapeHtml(req.params.id) + '\'s pet');
    }
};

app.map({
    '/users' : {
        get: users.list,
        delete: users.delete,
        '/:uid': {
            get: users.get,
            '/pets': {
                get: pets.list,
                '/:pid': {
                    delete: pets.delete
                }
            }
        }
    }
})


app.listen(3000, () => {
    console.log('the app is listening on localhost:3000');
})
