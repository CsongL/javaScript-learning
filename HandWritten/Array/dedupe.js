// 去除数组中重复的元素
// Reference: https://github.com/seriousManual/dedupe

function dedupe(arr, hasher) {
    hasher = hasher || JSON.stringify;
    const clone = [];
    const lookup = {};

    for(let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        let hashed = hasher(elem);

        if(!lookup[hashed]) {
            lookup[hashed] = true;
            clone.push(elem);
        }
    }
    return clone;
}

console.log(dedupe([1,2,3,4,1,2]));
console.log(dedupe([{a: 1, b:2}, {a: 2, b: 2}, {a:2, b: 2}]));
console.log(dedupe([{a: 1, b:2}, {a: 2, b: 2}, {a:1, b: 3}], value => value.a));
