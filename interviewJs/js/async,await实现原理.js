/**
 * async await 的底层实现原理就是 Generator函数 和 自动执行器
 * 首先明确 async最终返回的是一个promies对象，因此自动生成器最终返回的是一个promise对象
 * 而自动生成器的输入其实对应的Generator函数
 * 
 * 具体的实现如下
 * 
 * @param {Function} Generator function
 * @return {Promise}
 */

function spawn(genFn){
    return new Promise((resolve, reject) => {
        let gen = genFn();
        function step(nextFn) {
            let next;
            try {
                next = nextFn;
            } catch(e) {
                return reject(e);
            }
            if(next.done === true) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v) {
                step(function() { return gen.next(v); });
            }, function(e) {
                step(function() { return gen.throw(e); });
            })
        }
        step(function() { return gen.next();});
    });
}