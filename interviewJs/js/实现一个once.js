// 实现一个once, 记忆第一次执行的结果，之后再次调用还是返回第一次执行的结果
const f = (x) => x;

const onceF = once(f);

console.log(onceF(3));// => 3;

console.log(onceF(4)); // => 3

function once(fn) {
    let result;
    let resolved = false;
    return (...args) => {  // 这个实在同一个函数作用域中，所以调用函数时，引用的闭包对象是相同的
        if(resolved) return result;
        result = fn(...args);
        resolved = true;
        return result;
    };
}

const result = [];
for(let i = 0; i < 3; i++) {
    // 这个是在不同的函数作用域中，不同的函数作用域中的闭包肯定是不同的，所以不会输出相同的值
    result[i] = () => {
        console.log(i);  // js引擎执行时，发现这个有一个闭包，
                         // 会在堆中生成一个闭包对象，作用域上下文中会保存对该闭包的引用
    }                   // 所以 每一次形成闭包，都是对不同闭包对象的引用，因此值也就会不同
}

for(let item of result) {
    item();
}