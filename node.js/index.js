/*  每一个通过node运行的js文件 其实都是类似在一个函数中运行，js文件中的语句都包含在这个函数体中
函数的样子
(function(exports, require, module, __filename, __dirname){
    js文件中的语句
} )
 */
console.log(module);
console.log(require);
console.log(exports);
console.log(__filename);
console.log(__dirname);


/* 
documents content:
important module
    http module，
    os module,
    path module,

*/

const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener for events
emitter.on('messageLogged', (args) => {
    console.log(args);
});

// Raise an event
emitter.emit('messageLogged', {id: 1, url: '/url'});
