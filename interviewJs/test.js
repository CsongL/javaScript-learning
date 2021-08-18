var a = 1;

function b(){
    console.log(a);
    a = 10;
    console.log(a);
    return;
    function a(){}
}
console.log(a);
b();
console.log(a);
console.log(typeof a);

console.log(c);
function c(){
    console.log("test");
}
var c= 1;
console.log(c);
