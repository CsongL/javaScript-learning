// 深拷贝的方法
// 1. JSON.parse(JSON.stringfy(object)) 但是这种方法会导致
// 被拷贝对象中的正则表达式对象 和 error对象变为空对象, 
// 而日期对象变为字符串
// 对象中的函数和undefined，会被丢弃
// 对象中的NaN, infinity 和 -infinity 会变为 null
// JSON.stringify()只能序列化对象的自身可枚举属性，也就是定义在对象自身上的可枚举属性
let a1 = {
    "zz": 2,
    "arr": [1,2,3]
}

console.log(JSON.parse(JSON.stringify(a1)));

let a2 = {
    "date": new Date(),
    'obj': {
        "arr": [1,2,3]
    }
}

console.log(JSON.parse(JSON.stringify(a2)));



// 第二种方法  递归调用
function deepClone(object){
    if(object == null) return object;
    if(typeof object != "object") return object;
    let clone;
    if(isType(object, 'Array')){
        clone = [];
    }else if(isType(object, 'Date')){
        clone = new Date(object.getTime());
    }else if(isType(object, 'RegExp')){
        clone = new RegExp(object.source, getRegExp(object));
        if(object.lastIndex) clone.lastIndex = object.lastIndex;
    }else{  
        clone = Object.create(Object.getPrototypeOf(object));
    }
    for(let i in object){
        clone[i] = deepClone(object[i]);
    }
    return clone;
}

const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        break;
      default:
        flag = false;
    }
    return flag;
};

let a = {
    "zz": 2,
    "test": [1,2,3]
}
console.log(deepClone(a));

// 第三种方法，通过第三方库 例如lodash的cloneDep()方法
