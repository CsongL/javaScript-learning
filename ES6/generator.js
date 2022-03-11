// generator 生成器函数
// 生成器函数执行, 返回的是一个迭代器对象, 也就是说 这个generator函数就相当于是一个迭代器生成函数
// 生成器函数执行所返回的迭代器对象和普通迭代器对象一样，通过调用迭代器对象的next()方法来获得一个对象
// 通过获得的对象的value属性拿到返回的值， 通过对象的done属性来判断是否遍历完成
// 因此 可以把一个生成器函数 赋值给 一个对象的[Symbol.iterator]属性，从而使得该对象变为一个可迭代对象

const { start } = require("repl");

// yield 只能用在 generator函数内, 每次生成器函数所返回的迭代器调用next方法时，会返回yield 后面表达式的值

// next方法参数
// 由于yield 表达式本身是没有返回值的或者说总是返回undefined, 所以我们可以通过设置next()方法的参数来设置yield表达式的返回值
// 从而实现从函数外部向内部注入值的想法
function* nextParameters() {
    console.log('start');
    console.log(`1, ${yield}`);
    console.log(`2, ${yield}`);
    return 'result';
}
// 不给next()设置参数
let iterator = nextParameters();
iterator.next();
iterator.next(); // 1, undefined
iterator.next(); // 2, undefined


// 给next()方法设置参数
let nextIterator = nextParameters();
nextIterator.next(); 
nextIterator.next('a');
nextIterator.next('b');

// for...of.. 循环
// 因为执行生成器函数最终返回的就是一个迭代器对象,  而for...of循环可以遍历迭代器对象, 而不用调用迭代器对象的next()方法
// 因此 for...of.. 循环 可以用来遍历生成器函数所返回的迭代器对象
function* fibonacci() {
    let [prev, curr ] = [0, 1];
    while(true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

for(let n of fibonacci()) {
    if(n > 10) break;
    console.log('fibonacci, ' + n);
}

// 将generator函数作为对象的[Symbol.iterator]属性对应的函数值
function* generateObjectKeys() {
    let keys = Reflect.ownKeys(this);

    for(let key of keys) {
        yield [key, this[key]];
    }
}

const objectKeys = {name: 'cai', age: 12};

objectKeys[Symbol.iterator] = generateObjectKeys;

for(let prop of objectKeys) {
    console.log(prop);
}

// 生成器函数返回的每一个迭代器对象都会具有一个throw()方法，这个方法抛出的错误能够被生成器函数内部的catch()捕获, 捕获后，生成器函数会继续执行，直到碰到下一个yield
// 如果生成器内部没有捕获这个error，那么会被生成器函数外部的catch()捕获，并且这个迭代器的状态是已经结束的状态，也就是说下次调用next()方法返回的对象是{value: undefined, done: true}
// 如果生成器内部抛出一个错误且这个错误没有在内部被处理，那么这个错误将会在外部捕获，并且因为这个错误没有被处理从而导致这个generator函数的运行状态结束，下一次代用时，返回的是{value: undefined, done: true}
function* throwGenerator() {
    try {
        yield;
    }catch(e) {
        console.log('内部捕获' + e);
    }
}

let throwIterator = throwGenerator();

// 先要调用一下next() 方法 开始执行这个生成器函数
throwIterator.next();

try {
    throwIterator.throw(new Error('外部抛出错误'));
} catch(e) {
    console.log('外部捕获错误' + e);
}


// return()
// 每一个生成器函数执行后，所生成的迭代器对象都有一个return()方法，这个方法会将return()方法中的参数，作为value的值，返回，并且最重要的是会结束该生成器函数的状态
function* returnGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

let returnIterator = returnGenerator();

console.log(returnIterator.next());
console.log(returnIterator.return('foo'));
console.log(returnIterator.next());


// 如何理解生成器函数返回的Iterator对象上的next(), throw(), return()
// next, return, throw本质上都是恢复了generator函数的运行
// 只不过区别在于 next()方法将上一次暂停的yield表达式变成了 next()方法内的参数
// return() 方法将上一次暂停的yield表达式变成了 return语句
// throw() 方法将上一次暂停的yield表达式变成了 throw语句

// yield* 可以让我们在一个生成器函数中去调用另一个生成器函数
// yield* 可以自动的去帮我们调用另一个生成器函数返回的迭代器对象，从而可以拿到另一个生成器函数内部yield表达式后面的值
// eg
function* yieldBar() {
    yield 2;
    yield 3;
}

function* yieldFoo() {
    yield 1;
    yield* yieldBar();
    yield 4;
}

function* yieldFooWithout() {
    yield 1;
    yield yieldBar();
    yield 4;
}

let starFoo = yieldFoo();
console.log('yield *');
console.log(starFoo.next());
console.log(starFoo.next());
console.log(starFoo.next());
console.log(starFoo.next());

let withoutStarFoo = yieldFooWithout();
console.log('yield');
console.log(withoutStarFoo.next());
console.log(withoutStarFoo.next()); // 返回的value值是一个迭代器对象
console.log(withoutStarFoo.next());
console.log(withoutStarFoo.next());

// 数组平铺
function* isTree(arr) {
    if(Array.isArray(arr)) {
        for(let i = 0; i < arr.length; i++) {
            yield* isTree(arr[i]);
        }
    } else {
        yield arr;
    }
}

let multiArr = [1,2,3,4,[5,[6]]];

console.log([...isTree(multiArr)]);


// 遍历二叉树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

function* inOrder(tree) {
    if(tree) {
        yield* inOrder(tree.left);
        yield tree.label;
        yield* inOrder(tree.right);
    }
}

function make(arr) {
    if(arr.length === 1) return new Tree(null, arr[0], null)
    return new Tree(make(arr[0]), arr[1], make(arr[2]));
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

let treeResult = [];
for(let node of inOrder(tree)) {
    treeResult.push(node);
}

console.log(treeResult);

//  因为执行生成器函数最终会得到一个迭代器对象，所以我们可以把这个迭代器对象看成是这个生成器函数的实例对象
// 因此 这个迭代器对象 也就 能够调用这个生成器函数原型上的对象
function* generateObject(){
    console.log('generator function');
};

generateObject.prototype.hello = function() {
    return 'hello';
};

let instanceObject = generateObject();

console.log(instanceObject.hello());

// 但是生成器函数不能像构造函数那样 用 new 命令去执行, 只能向普通函数一样执行
