// prototype link
let a = new Array(1);

// prototype link
while(a.__proto__){
    console.log(a.__proto__.constructor);
    a = a.__proto__;
}
function getPrototype(object){
    while(object.__proto__){
        console.log(object.__proto__.constructor);
        object = object.__proto__;
    }
}

getPrototype(new Boolean(true));
let uid =Symbol('kkid');
console.log(uid);
let symObject = {
    [uid]: 1234
}
