const obj = {
    name: '林三清',
    age: 12,
    address: '247 Peel Street',
};

// 获取键值对
Object.prototype.sl_entries = function (obj) {
    const res = [];
    for (const key in obj) {
        obj.hasOwnProperty(key) && res.push([key, obj[key]]);
    }
    return res;
};

console.log(Object.sl_entries(obj));

// 从数组键值对去构建对象
Object.prototype.sl_fromEntries = function (arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        const [key, value] = arr[i];
        obj[key] = value;
    }
    return obj;
};

console.log(Object.sl_fromEntries([["name", "林三清"], ["age", 12], ["address", "247 Peel Street"]]));


Object.prototype.sl_assign = function (target, ...args) {
    if (!!!target) {
        throw new TypeError("The target object can not be null or undefined");
    }

    for (let nextObj of args) {
        for (let key in nextObj) {
            target[key] = nextObj[key];
        }
    }
    return target;
};

const target = { name: "林三清" };

const argObj_1 = { name: 'Lin', age: 12 };

const argObj_2 = { age: 20, address: "247 Peel Street" };

console.log(Object.sl_assign(target, argObj_1, argObj_2));


