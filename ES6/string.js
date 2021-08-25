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
console.log(raw({raw: ["Hello", "test"]}, 4+2, 2+4))
console.log(String.raw({raw: ["Hello", "test"]}, 1+2, 2+4))