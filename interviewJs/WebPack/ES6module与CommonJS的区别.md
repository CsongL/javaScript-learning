## ES6 module 与 CommonJS的区别

1. CommonJS的输出是一个值拷贝，而ES6 module是对值的一个引用
2. CommonJS是在运行的时候才进行加载, 也就是说是在运行时才能判断其模块之间的依赖关系，而ES6 module是在编译阶段就去建立模块之间的依赖关系。
3. 因为CommonJS和ES6 module对于输出的值是不同的处理方式，因此在处理循环引用时也是不同的效果。因为CommonJS是对输出值的拷贝，因此处理循环引用时，只能输出已经得到的结果，而对于后续模块内部的结果是感知不到的，所以也就无法输出，而ES6 module是对值的引用, 只有当使用的时候才会去读取值或加载函数，因此可以输出循环引用的结果
4. 关于模块顶层的this指向问题，在CommonJS顶层，this指向当前模块；而在ES6模块中，this指向undefined；
5. 关于两个模块互相引用的问题，在ES6模块当中，是支持加载CommonJS模块的。但是反过来，CommonJS并不能requireES6模块，在NodeJS中，两种模块方案是分开处理的。


### 第一点不同
因为CommonJS是对输出值的一个拷贝，如果模块内部发生了变化，但是输出的值是不会发生相应的变化的，因为这个在外部的这个值是对输出值的一个拷贝，相当于在内存中新开辟了一个空间，然后将模块内部的输出值拷贝进来，因此模块外部是不能感知到模块内部结构的变化


ES6模块运行机制完全不一样，JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行的时候，再根据这个只读引用，到被加载的那个模块里去取值


### Commonjs
使用require加载一个模块式，通常会在内存中生成一个新的对象，对象的形式如下：
```js
{
    id: '', // 模块id
    exports： {...}, // 模块输出的各个接口
    loaded: true, // 表示模块是否执行完毕
}
```
当我们以后在用到这个模块时，会直接从这个对象的exports属性读取值，
这个对象只会在第一次require一个模块时创建，之后不论require多少次这个模块，都是从缓存中读取这个对象的exports属性内的值。

对于Commonjs来说， 当我们require一个模块时，就会执行这个模块内的全部内容。一旦出现了循环引用，就只会输出已执行的部分，而为执行的部分不会被输出，并且由于是对输出值进行值拷贝，所以之后也不能取到变化的值。

循环引用的例子：
```js
// a.js
exports.done = false;
const b = require('./b');
console.log('b.done' + b.done);
exports.done = true;
console.log('a.js执行完毕');

//b.js
exports.done = false;
const a = require('./a.js');
console.log('a.done' + a.done);
exports.done = true;
console.log('b.js执行完毕');
```
执行结果：
'a.done false'
'b.js执行完毕'
'b.done true'
'a.js执行完毕'
执行过程解析：
当在a.js载入b.js文件时，会去执行b.js中的代码，而在b.js载入a.js文件时，此时a.js的exports.done属性值为false，因此在b.js中对a.js的输出值进行值拷贝，即 exports.done属性值为false， 因此在b.js中输出的就是'a.done false'，b.js文件执行完毕后，返回到a.js中，此时会创建一个对b.js输出值的一个值拷贝，而此时b.done属性的值是true，因此输出的是'b.done true'。
所以 循环引用，commonjs只会输出已经执行过的部分，而不会输出未执行部分的值。

### Reference
[docs](https://juejin.cn/post/6844904067651600391)
