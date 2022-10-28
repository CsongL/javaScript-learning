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

// console.log(player.sl_fill('csl', 1, 2));














