/**
 * 
 * @param {Object}
 * @return {String}
 * 
 * const obj = {
 *   a: 1,
 *   b: 2,
 *   c: 3,
 * } => 'a=1&b=2&c=3'
 */

function stringfy(obj) {

    const params = Object.entries(obj);
    const str = params.map((item, index) => {
        const [key, value] = item;
        let noValue = false;
        if(value === undefined || value === null || typeof value === 'object') {
            noValue = true;
        }
        return `${encodeURIComponent(key)}=${noValue ? '' : encodeURIComponent(value)}`
    }).join('&');
    return str;
}
const obj = {
    a : 1,
    b : 2,
    c : 3
}
console.log(stringfy(obj)); 