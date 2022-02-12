// 正则表达式 是 非常重要的一项内容， 通过正则表达式 可以用很少的代码快速的完成很多任务

// 正则表达式的修饰符 g-全局, i-忽略大小写， m: 多行模式， y: 粘附模式， 表示只从last index后面查找， u: unicode模式，可以匹配很多不常见的字符，可以识别4字节的字符 s: do All 表示匹配任何字符
// u修饰符 模式能够正确处理大于\uffff的Unicode字符，也就是说会正确处理四个字节的UTF-16编码
// y 修饰符 与 g修饰符类似，但是区别在于，g是有一个匹配之后，只要后面的还有能匹配的就行， 而y要求的是必须是上一个匹配成功的字符串下一个位置也要匹配上才行， 其实就是想让得到一个头部匹配的效果，就是之后的字符串也要头部匹配才行
let s = 'aaa_aa_aa';
let r1 = /a+/g;
let r2 = /a+/y;

console.log(r1.exec(s));
console.log(r2.exec(s));

console.log(r1.exec(s));
console.log(r2.exec(s));


console.log('aaxa'.replace(/a/gy, '-'));


const TokenRegexY = /\s*(\+|[0-9]+)\s*/y;
const TokenRegexG = /\s*(\+|[0-9]+)\s*/g;

function tokenize(regex, str) {
    let result = [];
    let match;
    while(match = regex.exec(str)) {
        result.push(match[0]);
    }
    return result;
}

console.log(tokenize(TokenRegexY, '3 + 4'));
console.log(tokenize(TokenRegexG, '3 + 4'));


// s 修饰符 使得 . 可以用来表示任意单个字符 如果不适用s修饰符 那么 . 只能表示 .

console.log(/foo.bar/.test('foo\nbar')); // => false;
// 如果使用的是s修饰符
console.log(/foo.bar/s.test('foo\nbar')); // => true;

// 先行断言 和 后行断言 
// 先行断言 可以用来判断是否匹配的字符串是否是在某一个字符或字符串前面
console.log(/\d+(?=%)/.exec('100% of us presidents have been male')); // - => 100 匹配的是必须是在%前面的字符
console.log(/\d+(?!%)/.exec('10% 40')); // => 匹配的是不在%前面的数字

// 后行断言
// 后行断言 可以用来匹配 字符是否是在某一个特定的字符或字符串的后面
console.log(/(?<=\$)\d+/.exec('$100')); //=> [100] 匹配的是在$符号后面的数字
console.log(/(?<!\$)\d+/.exec('$100 10')); //=> [10] 匹配的是不在$符号后面的数字 

// 具名组匹配 
// 使用圆括号进行组匹配
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
// 匹配的结果只能使用数组下标表示，不够明确
console.log(RE_DATE.exec('1992-12-02'));

// 因此引入了 具名组匹配，可以通过组名来得到对应的匹配结果
const RE_DATE_NAME = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

let matchObj = RE_DATE_NAME.exec('1992-12-02');

console.log(matchObj);
console.log(matchObj.groups.year);
console.log(matchObj.groups.month);
console.log(matchObj.groups.day);


// 通过具名组匹配 将字符串变形
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

console.log('2021-12-03'.replace(re, '$<day>/$<month>/$<year>'));

// 如果要在正则表达式内引用某个具名组匹配，那么通过\k<组名>的方式来匹配
let re_ref = /(?<word>[a-z]+)!\k<word>/;

console.log(re_ref.test('abc!abc'));
console.log(re_ref.test('abc!ab'));

 