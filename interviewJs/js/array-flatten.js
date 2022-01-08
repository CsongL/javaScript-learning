/**
 * the array-flatten is from the array-flatten package and
 * @source https://github.com/blakeembrey/array-flatten
 *
 */

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
