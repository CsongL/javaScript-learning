// create a Objecat use two differnt method
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

// 一次给对象定义多个属性   通过函数来定义对象的属性时，如果没有说明某一个特性的状态，那么这个特性的状态就默认为false,
//  而直接定义的对象的属性的特性例如： configurable, enumerable, writable,会直接默认为true 
let book2 = new Object();
Object.defineProperties(book2,{
    year_: {
        writable: true,
        value: 2017
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});
console.log(book2.year);
book2.year=2019;
console.log(book2.edition);

// 属性描述符  返回的是一个描述对象某一个属性的特性对象，这个对象里面包含了这个属性的所有特性
let descriptor = Object.getOwnPropertyDescriptor(book2, "year_");
console.log(descriptor);
console.log(descriptor.value);
console.log(descriptor.writable);
console.log(descriptor.configurable);

let descriptors = Object.getOwnPropertyDescriptors(book2);
console.log(descriptors);
console.log(descriptors.year_.value);
console.log(descriptors.year.get);

//Object.assign()可以将源对象的属性复制给目标对象，Object.assign()是对属性的一种浅复制，浅复制只会复制对象的引用，目标对象中的这个属性与源对象中的这个属性指向的是同一个值
let dest = new Object();
let src  = {
    id: 1
};
let result = Object.assign(dest, src);
console.log(dest);
console.log(result === dest);
console.log(dest === src);

let dest1 = {
    set a(x){
        console.log("Invoke the set method of dest1" + x);
    }
};
let src1 = {
    get a(){
        console.log("Invoke the get method of src1")
        return "foo";
    }
};
let result1 = Object.assign(dest1, src1);

let dest2 = new Object();
let src2 = { a: {}};
let result2 = Object.assign(dest2, src2);
console.log(dest2);
src2.a.id=1;
console.log(dest2);

// Object.is()
console.log(Object.is(+0, -0));
console.log(Object.is(+0, 0));
console.log(Object.is(0, -0));


let name ="Pertson";
let person5 = {
    name,
    id : 1
};
// same work 
/**
 * let person5 = {
 * name : name,
 * id: 1
 * }
 */
console.log(person5);

//  计算属性, 用变量的值来作为属性名需要将变量放在中括号内
let nameKey = "name";
let ageKey = "age";
let jobKey = "job";
let person6 = {};
person6[nameKey]="C";
person6[ageKey] = 12;
person6[jobKey] = "Worker";
console.log(person6);
let uniqueKey = 0;
function setPropertyName(value){
    return `${value}_${uniqueKey++}`;
}
let person7 = {};
person7[setPropertyName(nameKey)] = "z";
person7[setPropertyName(ageKey)] = 45;
person7[setPropertyName(jobKey)] = "Developer";
console.log(person7);

// 简写方法名
let book3 = new Object({
    name_: "test"
});
Object.defineProperty(book3, "name",{
    get() {
        return this.name_;
    },
    set(x){
        this.name_ = x;
    }
});
book3.name = "what is the meaning";
console.log(book3.name);

let book4 = {
    name_: "test",
    get name(){
        return this.name_;
    },
    set name(x){
        this.name_ = x;
    }
};
console.log(book4.name);

// 解构
let {name:nameValue_person7, age: ageValue_person7, job: jobValue_person7} = person6;
console.log(nameValue_person7);
console.log(ageValue_person7);
console.log(jobValue_person7);

function printPerson(foo, {name, age, job}, zoo){
    console.log(arguments);
    console.log(name, age, job);
}
function printPerson2(foo, {name: nameValue, age: ageValue, job: jobValue}, zoo){
    console.log(arguments);
    console.log(nameValue, ageValue, jobValue);
}

printPerson("1st", person6, "2st");
printPerson2("1st", person6, "2st");