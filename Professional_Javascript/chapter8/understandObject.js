// create a Objecat use two differnt method

const { threadId } = require("worker_threads");

//  first method to create an object
let person = new Object();
person.name = "Cai";
person.age =24;
console.log(person.name);
console.log(person.age);

//  second method to create an object
let person1 = {
    name: "C",
    age: 23
}
console.log(person1.name);
console.log(person1.age);

// property
// property can be divided into two differnt kinds: 数据属性 和 调用器属性
//  数据属性：既可以通过对象直接定义，也可以通过Object.defineProperty()来定义
//  调用器属性: 不能通过对象直接来定义，只能通过Object.defineProperty()来定义
//  特性是用来描述属性的， 需要用两个中括号将特性的名称括起来
//  不同的属性需要用不同的特性来描述
//  数据属性的特性： [[configurable]], [[Enumerable]], [[Writeable]], [[Value]]
//  调用器属性： [[configurable]], [[Enumerable]], [[Writeable]], [[Value]]
// 数据属性
console.log("Data Property");
let person3 = new Object();
Object.defineProperty(person3, "name", {
    configurable: true,
    writable: false,
    value: "Person3"
});
console.log(person3.name);
person3.name = "Person3_1";
console.log(person3.name);  //  can not change the value, because the writeable is false;
Object.defineProperty(person3, "name", {
    writable: true
});
person3.name = "Person3_2";
console.log(person3.name);


Object.defineProperty(person3, "name", {
    configurable:false,
});
delete person3.name;
console.log(person3.name);

//  调用器属性  不能直接定义，只能通过Object.defineProperty()来定义调用器属性
console.log("Caller Property");
let person4 = new Object();
Object.defineProperty(person4, "name", {
    configurable:true,
});
console.log(person4.name);
Object.defineProperty(person4, "name", {
    get() {
        return "Person4";
    }
});
console.log(person4.name);

let book = {
    year_ : 2017,
    edition : 1
}
Object.defineProperty(book, "year", {
    get() {
        return this.year_;
    },
    set(newValue) {
        if(newValue > 2017){
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
})

console.log(book.year);
book.year = 2018;
console.log(book.year);
console.log(book.edition);


