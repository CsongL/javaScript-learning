//  RegExp
let pattern1 = /[bc]t/g;  //  匹配第一个bt 或者 ct
let pattern2 = /bct/g; // 匹配第一个bct
let pattern3 = new RegExp('bct', 'g'); // the first argument is pattern， the second is flag
let pattern4 = /\[bc\]/i; //  匹配第一个[bct] 忽略大小写

let pattern5 = /\[bc\]/g;
console.log(pattern5.global);
console.log(pattern5.ignoreCase);
console.log(pattern5.multiline);
console.log(pattern5.unicode);
console.log(pattern5.sticky);
console.log(pattern5.source);
console.log(pattern5.flags);

let pattern6 = new RegExp("\\[bc\\]", "g");
console.log(pattern6.source);
console.log(pattern6.flags);

let text = "cat, bat, sat, fat";
let pattern7 = /.at/g;
let maches = pattern7.exec(text); // 对这个字符进行匹配后的结果， 存储着匹配的字符串。 index属性指明这次是哪一个下标开始的， input指明这次用于匹配的字符串是什么
console.log(maches.index);
console.log(maches[0]);
console.log(pattern7.lastIndex);

maches = pattern7.exec(text);
console.log(maches.index);
console.log(maches[0]);
console.log(pattern7.lastIndex);

maches = pattern7.exec(text);
console.log(maches.index);
console.log(maches[0]);
console.log(pattern7.lastIndex);

console.log("'RegExp构造函数属性")
let text2 = "this has been a short summer";
let pattern8 = /(.)hort/g;
maches = pattern8.exec(text2);
console.log(RegExp.input);
console.log(RegExp.lastMatch);
console.log(RegExp.leftContext);
console.log(RegExp.rightContext);

console.log("5.3: 原始值包装类型， 即将原始值通过构造函数包装为对象");
let numObject = new Number(10);  
console.log(numObject.toLocaleString());
console.log(numObject.toString());

console.log("Bool原始值包装类型")
let boolObject = new Boolean(false);
console.log(typeof boolObject);
console.log(boolObject instanceof Boolean);
console.log(boolObject && true);
console.log(boolObject.valueOf());
console.log(boolObject.toString());

console.log("Number原始值包装类型")
let num = new Number(10);
console.log(typeof num);
console.log(num.toFixed(2)); // 指定小数点后的位数，返回的指定的小数点位数的字符串表示
console.log(num.toExponential(1));  //  返回的是科学计数法表示的字符串形式，参数指定科学计数法的小数的位数  
console.log(num.toPrecision(3));  //  指定字符串中是数字的总位数
console.log(Number.isInteger(100)); // 判断是不是整数

