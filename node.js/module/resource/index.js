import express from 'express'

const app = express();

// 自定义的一个属性 和 方法
app.resource = function(path, obj) {
    app.get(path, obj.index);
    app.get(path + '/:a..:b.:format', function(req, res) {
        let a = parseInt(req.params.a, 10);
        let b = parseInt(req.params.b, 10);
        let format = req.params.format;
        obj.range(req, res, a, b, format);
    });
    app.get(path + '/:id', obj.show);
    app.delete(path + '/:id', function(req, res) {
        let id = parseInt(req.params.id, 10);
        obj.destory(req, res, id);
    });
};


const users = [
    { name: 'tj' }
    , { name: 'ciaran' }
    , { name: 'aaron' }
    , { name: 'guillermo' }
    , { name: 'simon' }
    , { name: 'tobi' }
  ];



const User = {
    index: function(req, res) {
        res.send(users);
    },
    show: function(req, res) {
        res.send(users[req.params.id] || 'Can not find user');
    },
    destory: function(req, res, id) {
        let destoryed = id in users;
        delete users[id];
        res.send(destoryed ? 'destoryed' : 'Can not find users');
    },
    range: function(req, res, a, b ,format) {
        let arr = users.slice(a, b + 1);
        switch (format) {
            case 'json':
                res.send(arr);
                break;
            case 'html':
            default:
                let html = '<ul>' + arr.map(function(val) {
                    return '<ul>'+ val.name + '</ul>';
                }).join('\n') + '</ul>';
                res.send(html);
                break;
        }
    }
};

app.resource('/users', User);


app.get('/', function(req, res){
    res.send([
      '<h1>Examples:</h1> <ul>'
      , '<li>GET /users</li>'
      , '<li>GET /users/1</li>'
      , '<li>GET /users/3</li>'
      , '<li>GET /users/1..3</li>'
      , '<li>GET /users/1..3.json</li>'
      , '<li>DELETE /users/4</li>'
      , '</ul>'
    ].join('\n'));
  });

app.listen(1234, function() {
    console.log('the server is listening on port 1234');
});
