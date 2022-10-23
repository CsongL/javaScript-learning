// 获取一个对象的嵌套对象的层数

const loopGetObjLever = (obj) => {
    let res = 1;

    const computedLever = (obj, lever) => {
        lever = lever ? lever : 0;
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    computedLever(obj[key], lever + 1);
                } else {
                    res = lever + 1 > res ? lever + 1 : res;
                }
            }
        } else {
            res = lever > res ? lever : res;
        }
    };

    computedLever(obj);

    return res;
};


const obj = {
    a: {
        b: 1
    },
    c: 2,
    d: 3,
};

console.log(loopGetObjLever(obj));