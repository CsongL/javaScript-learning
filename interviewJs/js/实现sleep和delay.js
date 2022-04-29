const { ReturnDocument } = require("mongodb");

// sleep函数
function sleep(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
};

// 实现一个3秒打印一个字符
async function printChar(n, delay) {
    for(let i = 1; i <= n; i++) {
        console.log(i);
        await sleep(delay);
    }
}


function anotherChar(n, delay) {
    let timer;
    let start =1;
    timer = setInterval(() => {
        if(n === start) {
            clearInterval(timer);
        } else {
            console.log(start++);
        }
    }, delay);
}

// 实现delay函数
/**
 * 
 * @param {Function}
 * @param {Number}delay
 * @param {Array}
 */

function delay(fn, delay, ...args) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = fn(...args);
            resolve(result);
        }, delay);
    });
}

delay((str) => str, 3000, 'hello world').then((value) => console.log(value));