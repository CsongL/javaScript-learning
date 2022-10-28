const player = [
    { name: "科比", count: 0},
    { name: "布兰特", count: 10 },
    { name: "詹姆斯", count: 2 },
    { name: "保罗", count: 15 },
    { name: "姚明", count: 24 },
]


// forEach method to iterate each item
Array.prototype.sl_forEach = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        callBack(this[i], i, this);
    }
};

player.sl_forEach((item, index) => {
    console.log(item, index);
});

// map method will return a new Array
Array.prototype.sl_map = function (callBack) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(callBack(this[i], i, this));
    }
    return res;
};

console.log(player.sl_map((item, index) => {
    return `${item.name} - ${item.count} - ${index}`;
}));

// filter method will return the item that the callback return true
Array.prototype.sl_filter = function (callBack) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        callBack(this[i], i, this) && res.push(callBack(this[i], i, this));
    }
    return res;
};

console.log(player.sl_filter((item) => {
    if (item.count > 10) return item;
}));


// every method： test whether each element satisfy the callback fucntion
Array.prototype.sl_every = function (callBack) {
    let flag = true;
    for (let i = 0; i < this.length; i++) {
        flag = callBack(this[i], i, this);
        if (!flag) break;
    }
    return flag;
};


console.log(player.sl_every((item) => {
    return item.count >= 10;
}));


// some method: test whether there are one element to satisfy the callback
Array.prototype.sl_some = function (callBack) {
    let flag = false;
    for (let i = 0; i < this.length; i++) {
        flag = callBack(this[i], i, this);
        if (flag) break;
    }
    return flag;
};

console.log(player.some((item, index) => {
    return item.count >= 10;
}));


// reduce method calculate the result of the array.
Array.prototype.sl_reduce = function (callBack, ...args) {
    let start = 0, pre = 0;
    if (args.length) {
        pre = args[0];
    } else {
        pre = this[0].count;
        start = 1;
    }
    for (let i = start; i < this.length; i++) {
        pre = callBack(pre, this[i], i, this);
    }
    return pre;
};

console.log(player.sl_reduce((prev, item) => {
    return prev + item.count;
}));



// findIndex  
Array.prototype.sl_findIndex = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        if (callBack(this[i], i, this)) {
            return i;
        }
    }
    return -1;
};

console.log(player.sl_findIndex((item) => item.name === "姚明"));


// find method which is used to find the element that we need
Array.prototype.sl_find = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        if (callBack(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

console.log(player.find((item) => item.name == "姚明"));

// fill method, three parameters: item, index, array
Array.prototype.sl_fill = function (value, start = 0, end) {
    end = end || this.length;
    for (let i = start; i < end; i++) {
        this[i] = value;
    }
    return this;
};

console.log([1,2,3,4].sl_fill('csl', 1, 2));

// join method： use join method to connect the item in the arr
Array.prototype.sl_join = function (separator = ',') {
    let str = '';
    for (let i = 0; i < this.length; i++) {
        str = i === 0 ? `${str}${this[i]}` : `${str}${separator}${this[i]}`;
    }
    return str;
};

console.log([1, 2, 3, 4].join('*'));

// flat method: use the method to flat the array;
Array.prototype.sl_flat = function (count = Infinity) {
    let arr = this;
    let num = 0;
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
        num++;
        if (num >= count) break;
    }
    return arr;
};

console.log([1, 2, [3, 4, [5]], [6, 7]].sl_flat(1));

Array.prototype.sl_splice = function (start, length, ...values) {
    if (length === 0) return [];
    length = start + length > this.length - 1 ? this.length - start : length;
    const res = [], tempArr = [...this];

    // replace the item in the original arr by the value in the values arr;
    for (let i = start; i < start + values.length; i++) {
        this[i] = values[i - start];
    }

    if (values.length < length) {
        let diff = length - values.length;
        for (let i = start + values.length; i < tempArr.length; i++) {
            this[i] = tempArr[i + diff];
        }
        this.length = tempArr.length - diff;
    }

    if (values.length > length) {
        for (let i = start + length; i < tempArr.length; i++) {
            this.push(tempArr[i]);
        }
    }
    for (let i = start; i < start + length; i++) {
        res.push(tempArr[i]);
    }

    return res;
};

const testSplice = [1, 2, 3, 4];
console.log(testSplice.sl_splice(1, 2, 5), testSplice, testSplice.length);












