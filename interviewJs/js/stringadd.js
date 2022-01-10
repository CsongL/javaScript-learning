/**
 * 如何将数字字符串相加减
 * 
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function stringAdd(str1, str2) {
    let firstEnd = str1.length - 1;
    let secondEnd = str2.length - 1;
    let carry = 0, cur = 0;
    const result = [];
    while(firstEnd >= 0 || secondEnd >= 0 || carry != 0) {
        cur = carry ;
        if(firstEnd >= 0) {
            cur += str1[firstEnd] - '0'.charCodeAt();
            firstEnd--;
        }
        if(secondEnd >= 0) {
            cur += str2[secondEnd] - '0'.charCodeAt();
            secondEnd--;
        }
        carry = Math.floor(cur / 10);
        cur = cur % 10;
    }
    result.reverse();
    return result.join('');
}