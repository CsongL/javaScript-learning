/**
 * the array-flatten is from the array-flatten package and
 * @source https://github.com/blakeembrey/array-flatten
 *
 */

// 通过 Array.prototype.flat(depth) depth指定深度
console.log([1,2,3,[4,5,[[6]]]].flat(2))

// 简单的函数
function flatten(array, depth = 1) {
    if(depth === 0) return array;
    return array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b, depth -1) : b), []);
}

console.log(flatten([1,2,3,[4,5,[[6]]]], 2));



// 复杂的实现
function arrayFlatten(array, depth) {
    if(depth == null) {
        return flattenForever(array, []);
    } else {
        return flattenWithDepth(array, [], depth);        
    }
}

function flattenForever(array, result) {
    for(let val of array) {
        if(Array.isArray(val)) {
            flattenForever(val, result);
        } else {
            result.push(val);
        }
    }
    return result;
}

function flattenWithDepth(array, result, depth) {
    for(let val of array) {
        if(depth > 0 && Array.isArray(val)) {
            flattenWithDepth(val, result, depth - 1);
        } else {
            result.push(val);
        }
    }
    return result;
}


console.log(arrayFlatten([1,2,3,[4,5,[[6]]]], 2));
