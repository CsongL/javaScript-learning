// Promise.all([promises])方法 当数组中所有的promise实例对象都成功执行(即状态变为fulfilled)时
// Promise.all()所返回的promise实例对象的状态才会变为fulfilled，
// Promise.all()方法的参数数组中如果有一个promise实例对象的状态变为failed, 那么 Promise.all()方法所返回的promise实例对象的状态也就会变为failed
// 也就是 当所有的promise都成功了，那么就返回一个fulfilled状态的promise实例对象
// 如果有一个promise失败，那就肯定失败了

// 有一个失败就会返回一个rejected状态的promise实例对象
Promise.all([Promise.resolve('123'), Promise.reject('error'), Promise.reject('error2')]).then((res) => {
    console.log(res);
}, (error) => {
    console.log(error);
});

Promise.all([Promise.resolve('123'), Promise.resolve('456'), Promise.resolve('789')]).then((value) => {
    console.log(value);
});


// polyfill
const myPromiseAll = (args) => {
    return new Promise((resolve, reject) => {
        let resultArr = [];
        let iteratorIndex = 0;
        let fullCount = 0;
        for(let item of args) {
            let index = iteratorIndex;
            iteratorIndex++;

            // 因为可能传递进来的不是一个promise实例对象,所以需要使用Promise.resolve()封装一下
            Promise.resolve(item).then((res) => {
                resultArr[index] = res;
                fullCount++;

                if(fullCount === iteratorIndex) {
                    resolve(resultArr);
                }
            }, (error) => {
                reject(error);
            });
        }
        if(iteratorIndex === 0) {
            resolve(resultArr);
        }
    });
};

myPromiseAll([Promise.resolve('123'), Promise.reject('error'), Promise.reject('error2')]).then((res) => {
    console.log(res);
}, (error) => {
    console.log(error);
});


myPromiseAll([Promise.resolve('123'), Promise.resolve('456'), Promise.resolve('789')]).then((res) => {
    console.log(res);
});



