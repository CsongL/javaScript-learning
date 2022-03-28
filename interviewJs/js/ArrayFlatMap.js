// Array.prototype.flatMap(callback function(currentValue, index, array), thisArg)
// flatMap 就是类似于  先对数组调用map(), 然后在对map()返回的函数调用flat()函数，不过flat()函数的深度只为1

const arr = [1, 2, 3, 4];

console.log(arr.flatMap((x) => [x, x * 2]));


const flat = (arr) => {
    return arr.reduce((a, b) => a.concat(b), []);
}

Array.prototype.fakeFlatMap = function(fn, thisPoint = undefined) {
    if(thisPoint === undefined) {
        return this.map(fn).flat();
    }
    return thisPoint.map(fn).flat();
}

console.log(arr.fakeFlatMap((x) => [x, x *2], [4,5,6]));