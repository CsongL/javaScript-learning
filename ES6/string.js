//  字符串是实例对象.codePointAt() //  将字符转换为对应的码值
//  String.fromcodePoint() // 将码值转换为对应的字符
console.log("A".codePointAt(0));
console.log(String.fromCodePoint("A".codePointAt(0)));

//  String.raw
console.log(String.raw`Hello\n${1+2}`)
//  String.raw真实转移之后的结果
console.log(String.raw`Hello\n${1+2}` == 'Hello\\n3')
// 正常使用String.raw()方法的方式，第一个参数是一个对象，这个对象必须有·row属性，raw属性的值是一个对象
let raw_1 = String.raw({raw: ["Hello", "test","why"]}, 1+2, 2+4);
console.log(raw_1)
// raw function 的实现
function raw(strings, ...values){
    let output = "";
    let index;
    for(index = 0; index < values.length; index++){
        output += strings.raw[index] + values[index];
    }
    if(strings.raw[index]){
        output += strings.raw[index];
    }else{
        output = output.substring(0, output.lastIndexOf(values[--index]));
    }
    
    return output;
}
console.log(raw({raw: ["Hello", "test"]}, 4+2, 2+4));

console.log(String.raw`test${2+4}`);
console.log(raw`test${2+4}`);

console.log(String.raw({raw: ["Hello", "test"]}, 1+2, 2+4));
console.log(String.raw({raw: ["Hello", "test"]}, 1+2, 2+4));

function safeHtml(templateData){
    let s = templateData[0];
    for(let i =1; i<arguments.length; i++){
        let arg = arguments[i];
        s += arg.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&rt;");
        s += templateData[i];
    }
    return s;
}
let sender = "<script>alert(abc)</script>";
let message = safeHtml`<p>${sender} has sent you a message</p>`;
console.log(message);

// 一字节八个二进制位， 一通常一个字符是由两个字节存储的，每次读取字符的时候也只是读取两个字节，
// 所以如果字符对应的码值 大于 0xFFFF,那么就会被分为两次读取，而codePointAt()可以一次读取大于0xFFFF的字符，并将其转为对应的Unicode码值


// let charO = String.fromCodePoint(\u01D1);
// console.log(charO);

console.log('\u01D1'.normalize() === '\u004F\u030c'.normalize());

let inMessage = "Hello world!";
console.log(inMessage.endsWith("!"));
console.log(inMessage.startsWith("Hello"));
console.log(inMessage.includes("w"));

// 补全
let test = 'abs'.padStart(10, "0123456789");
console.log(test);
test = 'abs'.padEnd(2, "dd");
console.log(test);