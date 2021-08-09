let book = {
    name: "Professional JavaScript",
    authors: [
        "caimeng",
        "song"
    ],
    year: 2017,
    edition: 4,
    releaseDate: new Date(2017, 11, 4)
};

let jsonBook = JSON.stringify(book);
console.log(jsonBook);

//  通过数组参数来决定序列化的json对象中的属性名和属性值
let jsonBook1 = JSON.stringify(book, ["name", "year"]);
console.log(jsonBook1);

//  通过一个函数来决定序列化中属性名和属性值
let jsonBook2 = JSON.stringify(book, (key, val) =>{
    switch(key){
        case "authors":
            return val.join(",");
        case "year":
            return 5000;
        case "edition":
            return undefined; //  如果返回的值是undefined，那么JSON兑像会忽律该属性和值
        default:
            return val;
    }
});
console.log(jsonBook2);

//  JSON.stringify() 第三个参数用来控制缩进的格式，
let jsonBook3 = JSON.stringify(book, null, 4); //  每一个层级相比于上一个层级缩进4格
console.log(jsonBook3);
let jsonBook4 = JSON.stringify(book, null, "--"); //  也可以用字符串来设置缩进的方式
console.log(jsonBook4);

let book1 = {
    name: "Professional JavaScript",
    authors: [
        "caimeng",
        "song"
    ],
    year: 2017,
    edition: 4,
    releaseDate: new Date(2017, 11, 4),
    toJSON: function(){
        console.log("toJSON");
        return {
            "name": "Professional JavaScript",
            "edition":"4"
        }
    }
};

let jsonBook1_1 = JSON.stringify(book1, (key, value)=>{
    console.log("filter" + key);
    if(key == "edition"){
        return undefined;
    }
    return value;

});
console.log(jsonBook1_1);

let bookCopy = JSON.parse(jsonBook, (key, value) => key === "releaseDate"? new Date(value) : value);

console.log(bookCopy.releaseDate);
console.log(typeof bookCopy.releaseDate);
console.log(bookCopy.releaseDate instanceof Date);