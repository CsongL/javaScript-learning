const headToLowerCase = str => str.replace(/(^[A-Z])/g, (m, p1) => p1.toLowerCase());
    
const is = (val, compareType) => {
    const type = Object.prototype.toString.call(val)
        .replace(/^(\[object+\s)([\S]+)(\]$)/g, (m, p1, p2) => headToLowerCase(p2));
    return compareType ? headToLowerCase(compareType) === type : type;
}

function create(proto, propertiesObject) {
    const obj = {};
    obj.__proto__ = proto;
    Object.entries(propertiesObject).forEach(([key, value]) => is(value, 'object') && Object.defineProperty(obj, key, value));
    return obj;
}

const obj = {
    a: 1,
    b: 2,
};


test('test is function', () => {
    expect(is(obj, 'object')).toBe(true);
})


