// Promise.any 只要有一个成功，那就返回原来
// 如果全都失败了，那就返回失败的数组、
Promise.any = function (iterator) {
    return new Promise((resolve, reject) => {
        let _promiseArr = Array.from(iterator);
        let len = _promiseArr.length;
        let rejectedArr = [];
        _promiseArr.forEach((item) => {
            Promise.resolve(item).then((result) => {
                resolve(result);
            }).catch((error) => {
                rejectedArr.push(error);
                if(rejectedArr.length === len) {
                    reject(rejectedArr);
                }
            });
        });
    });
}



Promise.any([Promise.resolve('1'), Promise.resolve(2), Promise.reject(3)]).then((result) => {
    console.log(result);
});

Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(3)]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

