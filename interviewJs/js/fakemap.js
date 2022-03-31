Array.prototype.fakeMap = function(mapper, thisArg = undefined) {
    let arr = thisArg === undefined ? this : thisArg;
    let result = new Array(arr.length).fill(0);
    for(let i = 0; i < arr.length; i++) {
        result[i] = mapper(arr[i], i, arr);
    }
    return result;
};

let arr = [1,2,3];
console.log(arr.fakeMap(x => x * 3));

console.log(arr.fakeMap(x => x * 3, [2,4,8]));