// impl String.prototype.indexOf()
String.prototype.fakeIndexOf = function(searchVal, fromIndex) {
    let str = this;
    let len = str.length;

    let n = fromIndex || 0;
    let k = n < 0 ? 0 : (n >= len ? len : n);
    while(k < len) {
        if(searchVal === str.substring(k, k + searchVal.length)) {
            return k;
        }
        k++;
    }
    return -1;
};

console.log('abcdef'.fakeIndexOf('cdef', 12));