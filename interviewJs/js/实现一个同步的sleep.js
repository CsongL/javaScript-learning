// 同步sleep函数 就是只 这个函数在运行的时候
// 其他函数也是不能运行的，因为当前这个sleep是并行执行的
// 所以这个函数要一直执行，直到指定的时间过期
function syncSleep(delay) {
    console.log('>>> sleep start');
    let startTime = +(new Date());
    let currTime = startTime;
    while((currTime - startTime) <= delay) {
        currTime = +(new Date());
    }
    console.log('>>>sleep end');
}

syncSleep(3000);
console.log('hi');