// 测试用例
const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;

// compose(add10, mul10, add100)(10) => (10 + 100) * 10 + 10 =1110;

// 从右往左, 先运行后面传入的函数
const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args))); 

// 从左往右，先运行前面的函数，然后再运行后面的函数
const composeReverse = (...fns) => fns.reduce((a, b) => (...args) => b(a(...args))); 

 
const result = compose(add10, mul10, add100)(10);

// (10 + 10) * 10 + 100 = 300
const resultReverse = composeReverse(add10, mul10, add100)(10);

console.log('compose result(add10, mul10, add100 function): ' + result);

console.log('compose reverse result(add10, mul10, add100 function): ' + resultReverse);