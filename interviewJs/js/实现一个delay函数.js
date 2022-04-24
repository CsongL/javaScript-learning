// function delay(func, seconds, ...args) {}

// 在 3s 之后返回 hello, world
// await delay((str) => str, 3000, "hello, world");

// 在 3s 之后返回 hello, world，第一个函数可返回 promise
// await delay((str) => Promise.resolve(str), 3000, "hello, world");

function delay(func, seconds, ...args) {
    return new Promise((resolve, reject) => {
        Promise.resolve(func(...args)).then(resolve).catch(reject);
    })
}