/**
 * 
 * @param {string}
 * @param {string}
 * @returns {string}
 * 
 */

function bigNumMultiply(num1, num2) {
    let n = num1.length, m = num2.length;
    let ans = new Array(n + m).fill(0);

    for(let i = n - 1; i >= 0; i--) {
        for(let j = m - 1; j >= 0; j--) {
            let pos1 = i + j, pos2 = i + j + 1;
            let mul = (num1[i] - '0') * (num2[j] - '0');
            let sum = mul + ans[pos2];

            ans[pos2] = sum % 10;
            ans[pos1] += Math.floor(sum / 10);
        }
    }
    return ans.join('').replace(/^0+/, '');
}

console.log(bigNumMultiply('123', '45'));