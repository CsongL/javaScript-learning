let arr = [1,3,2];
arr.sort((a, b) => a-b);
console.log(arr);

// 箭头函数内部的this指向是固定的，是只能指向定义箭头函数时所在的作用域
// 普通函数内部的this指向的是运行时的作用域