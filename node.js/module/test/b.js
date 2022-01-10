// 再次表名一个文件就是一个模块， 一个模块的children 是一个数组，数组中存储的是在当前文件中所引入的其他js文件（也就是模块）对象，
// 而module.parent就表明当前这个文件（模块）是被哪一个模块或者文件所引入的

console.log(module.parent);
console.log(module.children);

require('./a.js');

let aModule = require('./a.js');
console.log(aModule);
console.log(module.children);