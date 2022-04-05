// Object.assign() polyfill方法
if(typeof Object.assign !== 'function') {
    Object.defineProperties(Object, assign, {
        value: function(target, sources) {
            if(target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            const obj = Object(target);

            for(let index = 1; index < arguments.length; index++) {
                let sourceObj = sources[index];

                if(sourceObj !== null && sourceObj !== undefined) {
                    for(let key in sourceObj) {
                        // Object.prototype.hasOwnProperty用来判断是否是对象自身的属性 而不是继承而来的属性
                        // 因此 Object.assign只能将源对象自身的属性赋值给目标对象
                        if(Object.prototype.hasOwnProperty.call(sourceObj,key)) {
                            obj[key] = sourceObj[key];
                        }
                    }
                }
            }
            return obj;
        },
        writable: true,
        configurable: true
    });
}