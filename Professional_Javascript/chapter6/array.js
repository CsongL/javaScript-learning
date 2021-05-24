//  the 归并方法
let values = [1,2,3,4,5,6];
// from left to right;
let sum = values.reduce((prev, curr, index, array)=> prev + curr);
// from right to left;
let sumRight = values.reduceRight((prev, curr, index, array)=> prev + curr);
console.log(sum);
console.log(sumRight);

// the filter, map , each , some, forEach method
// the filter method
let number = [1,2,3,4,5,6,7,8,1,2];
let filterResult = number.filter((elem, index, array) => elem >2);
console.log(filterResult);

// the map method, be used to each element in the array, and the result is consist of changed element
let mapResult = number.map((elem, index, array) => elem*2);
console.log(mapResult);

// the each method, if each element satisfy the function, the result will be true
// if these is a resualt is false, return false inmeediately
let eachResult = number.every((elem, index, array) => {
    console.log(elem);
    console.log(index);
    elem >= 1;
});
console.log(eachResult);

// the some method, if there is any element can get the true result, the result will be true
let someResult = number.some((elem, index, array) => {
    console.log(elem);
    console.log(index);
    elem > 1;
});
console.log(someResult);

// find method and findIndex method
let people = [{
    "name": "Cai",
    "age": 21
}, {
    "name": "Chang",
    "age": 30
}];
let findResult = people.find((elem, index, array) => elem.age > 28);
let findIndexResult = people.findIndex((elem, index, array) => elem.age>28);
console.log(findResult);
console.log(findIndexResult);

// concat method and splice method 
//  both method will create a new array
let colors = ["red", "yellow", "blue"];
let newColors = ["green", "pink"]
let moreColors = colors.concat("puple", newColors);
newColors[Symbol.isConcatSpreadable] = false;
let colors1 = colors.concat(newColors);
console.log(moreColors)
console.log(colors1);

// sort method 
// increase 
let unSorted = [4,3,5,6,1,2];
unSorted.sort((a,b)=> a -b);
console.log(unSorted);

// descease
unSorted.sort((a,b) => b-a);
console.log(unSorted);
