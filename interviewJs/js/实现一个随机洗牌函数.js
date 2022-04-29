// shuffle()函数的作用就是打乱数组中的数据，改变数组中数据的位置

// 简单的通过sort实现
const simpleShuffle = (arr) => arr.sort((a, b) => Math.random() - 0.5);

console.log(simpleShuffle([1,2,3,4]));

// 另外一种实现 从后向前，每一将最后一个元素与前面任意一个元素互换位置，从而实现数组随机
function shuffle(arr) {
    let result = [...arr];
    let len = result.length;
    for(let i = len - 1; i >= 0; i--) {
        let swapIndex = Math.floor(Math.random() * (i + 1));
        [result[i], result[swapIndex]] = [result[swapIndex], result[i]];
    }
    return result;
}

console.log(shuffle([1,2,3,4]));