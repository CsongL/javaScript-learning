const obj = {
    a: 1,
    b: 2,
    c: 3,
};

// 第一种遍历方法，是通过Object.keys()， Object.values(), Object.entries()
// 上面这三种方法只能遍历 该对象自身上的可遍历属性
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

// 第二种 for..in 这种方法也是只能遍历该对象自身的可遍历属性
for(let key in obj) {
    console.log(obj[key]);
}

// 第三种 自定义实现该对象的[Symbol.iterator]接口，这样可以通过for...of来实现对对象的遍历
obj[Symbol.iterator] = function() {
    let i = 0;
    let obj = this;
    let keys = Object.keys(obj);
    return {
        next() {
            return i < keys.length ? {value: obj[keys[i++]], done: false} : {value: undefined, done: true} 
        }
    }
}

for(let value of obj) {
    console.log(value);
}