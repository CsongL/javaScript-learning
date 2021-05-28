//Map and weakMap
//Map is a useful structure to store rge key and value

let newMap = new Map([
    ["key","test"],
    ["case","zz"]
]);
console.log(newMap.get("key"));
newMap.set(1, "what");
console.log(newMap.get(1));
function testMap (){
    console.log("what");
}
newMap.set(testMap, "what");
// object can be used to as the key
console.log(newMap.get(testMap));
console.log(newMap.has("case"));
for(let elem of newMap.values()){
    console.log(elem);
}
for(let key of newMap.keys()){
    console.log(key);
}

for(let pair of newMap.entries()){
    console.log(pair);
}
console.log(newMap.size);
newMap.delete("case");
console.log(newMap.size);

//weakMap weakMap we can only use the object as the key
//  if we do not use the object as the key, there will be a TypeError
let key1 = {id:1};
let key2 = {id:2};
let key3 = {id:3};

let weakMap1 = new WeakMap([
    [key1, "1"],
    [key2, "2"],
    [key3, "3"]
]);
console.log(weakMap1.has(key1));
console.log(weakMap1.get(key1));
let string = new String("String");
weakMap1.set(string, "4");

const vm  = new WeakMap();
class User {
    constructor(id){
        this.idProperty = Symbol('id');
        this.setId(id);
    }
    setPrivate(property, value){
        const privateMember = vm.get(this) || {};
        privateMember[property] = value;
        vm.set(this, privateMember);
    }
    getPrivate(property){
        return vm.get(this)[property];
    }
    setId(id){
        this.setPrivate(this.idProperty, id);
    }
    getId(){
        return this.getPrivate(this.idProperty); 
    }
}

const user = new User(123);
console.log(user.getId());
user.setId(234);
console.log(user.getId());

console.log(vm.get(user)[user.idProperty]);
console.log(vm.get(user) instanceof Object);
console.log(vm.get(user).idProperty);
console.log(user.idProperty);

//  符号 
let id = Symbol.for('id');
let student = {
    id: '1'
};
console.log(student.id);
let id2 = Symbol.for('id');
student[id2] = 2;
console.log(student.id2);
console.log(student);
console.log(student[id2]);
student[id] = 1;
console.log(student);
console.log(student[id]);




