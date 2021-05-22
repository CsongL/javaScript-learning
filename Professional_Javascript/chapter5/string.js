let message = "abcdef";
//  charCodeAt()方法
console.log(message.charCodeAt(2));
//  fromCharCode() method  transmit the UTF-16 code to corresponding char
console.log(String.fromCharCode(97,98,99,100,101));

//  the comparison of string is compare the 码值， even they are look like the same
// However, if they do not have same 码值， they are not euqal
//  but, we can use the normalize() to change the 码值, and compare their value
// fox example
let a1 = String.fromCharCode(0x00c5);
let a2 = String.fromCharCode(0x212b);
console.log(a1);
console.log(a2);
console.log(a1 === a2); // false because they do not have the same 码值, even they are look same;
console.log(a1.normalize("NFC") === a2.normalize("NFC"));  //  there are four different Normalization Form to transmit the code


// slice() and the substring() is same, the paramets of these two methods are same
// substr() the first parameter is the start position, the second parameter is the length of string we can to get
let substr = "abcdefjhijk";
console.log(substr.substr(1,4));
console.log(substr.substring(1,4));
// they have different handle for the negative parameters
console.log(substr.slice(-5,-1));
console.log(substr.substr(-5));
console.log(substr.substr(-5,-1)); //  substr will trun the second negative parameters to 0
console.log(substr.substring(-5,-1)); //  substring will turn all negative parameters to 0
