// prototype link
let a = new Array(1);

// prototype link
while(a.__proto__){
    console.log(a.__proto__.constructor);
    a = a.__proto__;
}
