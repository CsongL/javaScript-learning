// 代理模式及其强大，我们可以在对象进行基本操作时自定义一些操作，例如 在对象获取属性时知道何时获取了这个属性的值，
//  在修改对象属性的值时，我们可以发出通知，通知这个属性的值发生了变化，感觉vue是否就是通过代理来实现的呢，
// vue动态的修改属性，当这个对象的属性的值发生变换时，可以进行一些动态的操作
//  代理模式还可以用来隐藏属性， 以及权限控制， 根据用户的权限属性，来判断这个用户是否能够调用某个属性，在调用属性的值时，先判断一下用户权限，看用户是否能够调用查看该属性的值
//  属性的验证， 当我们修改属性的值时，会调用set()捕获器，可以在set()捕获器中所要赋予对象的值进行判断，看是否可以进行复制操作
//  函数参数，构造函数参数的验证， 当目标对象为一个普通函数对象时，那么调用代理对象作为函数使用时，会用到其apply()方法，在这个方法中可以对函数的参数进行一个判断、
//  构造函数的代理对象 在被new 操作符调用时， 会被constructor()捕获器调用，在这个捕获器中可以构造参数进行一些验证
// 数据绑定， 在get（），constructor()等方法中，可以将得到的数据值，或对象绑定到其他对象上，从而实现动态的变化


// 跟踪属性访问
const user= {
    name: "John"
};

const proxy = new Proxy(user, {
    get(target, property, proxy){
        console.log(Date.now());
        console.log(`Getting ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, proxy){
        console.log(Date.now());
        console.log(`Setting ${property}`);
        return Reflect.set(...arguments);
    }
});

console.log(proxy.name);
proxy.name = "Lea";
proxy.id = 1;

// 隐藏属性
let hiddenProperty = ["bar", "foo"];
const target1 = {
    bar: "11",
    foo: "2",
    zoo: "12"
};
const proxy1 = new Proxy(target1, {
    get(target, property, proxy){
        if(hiddenProperty.includes(property)){
            return undefined;
        }else{
            return Reflect.get(...arguments);
        }
    },
    has(target, property){
        if(hiddenProperty.includes(property)){
            return false;
        }else{
            return Reflect.has(...arguments);
        }
    }
});

console.log(proxy1.bar);
console.log(proxy1.foo);
console.log(proxy1.zoo);

console.log("bar" in proxy1);
console.log("foo" in proxy1);
console.log("zoo" in proxy1);

const target2 = {
    onlyNumber: 0
};
const proxy2 = new Proxy(target2, {
    set(target, property, value){
        if(typeof value != "number"){
            return false;
        }else{
            return Reflect.set(...arguments);
        }
    }
});

proxy2.onlyNumber = 1;
console.log(proxy2.onlyNumber);
proxy2.onlyNumber = "8";
console.log(proxy2.onlyNumber);

function firstElement(...nums){
    nums.sort((a,b)=> a-b);
    return nums[0];
}

const proxy3 = new Proxy(firstElement, {
    apply(target, thisArg, argumentList){
        for(const arg of argumentList){
            if(typeof arg != 'number'){
                throw "there should be a number argument";
            }
        }
          return Reflect.apply(...arguments);
    }
});
console.log(proxy3(4,3,1,23));
// console.log(proxy3(1,2,3,4,"4"));

class User{
    constructor(id){
        this.id = id;
    }
}

const proxy4= new Proxy(User, {
    construct(target, argumentList, newTarget){
        if(argumentList[0] === undefined){
            throw "need a id value";
        }else{
            return Reflect.construct(...arguments);
        }
    }
});
let proxy4_2 = new proxy4(4);
//   let proxy4_1 = new proxy4(); 会抛出一个错误

let userList = [];
class User2{
    constructor(name){
        this.name = name;
    }
}
let proxy5 = new Proxy(User2, {
    construct(target, argumetList, newTarget){
        let user = Reflect.construct(...arguments);
        userList.push(user);
        return user;   
    }
});
new proxy5("John");
new proxy5("Ha");
new proxy5("Lea");
console.log(userList);

