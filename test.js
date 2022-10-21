// const n = parseInt(read_line());
// const result = [];
// // 获取9的数量
// const getNineCount = (number) => {
//   let str = number + '';
//   let index = str.length - 1;
//   let count = 0;
//   while (index >= 0 && str[index] === '9') {
//     count++;
//     index--;
//   }
//   return count + 1; // 因为最前面那位也要发生变化，所以需要+1
// };
// for (let i = 0; i < n; i++) {
//   const [init, addValue] = read_line().split(' ').map(item => parseInt(item));
//   let temp = init;
//   let tempAdd = addValue;
//   let needCount = getNineCount(temp);
//   while (tempAdd - needCount >= 0) {
//     temp = temp + 1;
//     tempAdd = addValue - needCount;
//     needCount = getNineCount(temp);
//   }
//   result.push(temp);
// }

// console.log(...result);



// function test(init, addValue) {
//     let temp = init;
//     let tempAdd = addValue;
//     let needCount = getNineCount(temp);
//     while (tempAdd - needCount >= 0) {
//       temp = temp + 1;
//       tempAdd = tempAdd - needCount;
//       needCount = getNineCount(temp);
//       console.log(needCount);
//    }
//   return temp;
// }


// console.log(test(1, 110));

console.log('0'.charCodeAt());
console.log(parseInt(5/2))

[1,2,3]







