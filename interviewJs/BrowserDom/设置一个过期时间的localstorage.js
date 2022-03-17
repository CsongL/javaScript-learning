// localStorage内部的数据本身会一直存储着，除非是手动去清除存储的localStorage
// 可以自己封装一个带有过期时间的localStorage
function initLocalStorage() {
    localStorage.setItem = function(key, value, time = 1000) {
        let expiresTime = Date.now + time * 1000;
        const data = {
            __data: value,
            __expiresTime: expiresTime
        };
        Storage.prototype.setItem.call(localStorage, key, JSON.stringify(data));
    };

    localStorage.getItem = function(key) {
        let data = Storage.prototype.getItem.call(localStorage, key);
        if(typeof data === 'string') {
            let jsonValue = JSON.parse(data);
            if(jsonValue.__expiresTime) {
                if(jsonValue.__expiresTime > Date.now()) {
                    return JSON.stringify(jsonValue.__data);
                } else {
                    return null;
                }
            }
        }
        return data;
    };
}