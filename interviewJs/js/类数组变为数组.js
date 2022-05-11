// 类数组变为数组的几种方式


// 类数组对象定义：1.可以通过索引访问属性值(也就是说key是一个数字) 2 必须要具有length属性
let obj = {
    0: 'name',
    1: 'age',
    2: 'test',
    "length": 3
}

// 第一种通过slice，该方法不传参就会返回的是这个数组的一个浅拷贝
const sliceArr = Array.prototype.slice.call(obj);
console.log(obj[1]);
console.log(sliceArr);

// 第二种方法，通过扩展操作符，但是扩展操作符要求 类数组对象必具有迭代器接口也就是 [Symbol.iterator]
// 因为扩展操作符本质上与let...of一样是通过调用迭代器接口返回的迭代器对象的next方法来实现的
// 而let...in属性遍历的是对象自身的可迭代属性

try{
    console.log([...obj]);
}catch(error) {
    console.log('error, because the obj do not implement the [Symbol.iterator]')
}

let objIterator = Object.assign({}, obj);
objIterator[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
console.log(objIterator);
console.log([...objIterator]);

// 第三种方法通过Array.from()方法
console.log(Array.from(obj));
console.log(Array.from(objIterator));