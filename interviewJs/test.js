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


function calExpon(base, exop){
    let p = 1, j= exop;
    while(j > 0){
        if(j % 2 == 0 && j != 0){
            base = Math.pow(base, 2);
            j = j / 2;
        }else{
            p = p * base;
            j--;
        }
    }
    return p;
}

console.log(calExpon(4,5));