const myTimeInterval = (fn, delay) => {
    let timer = null;

    const interVal = () => {
        fn();
        timer = setTimeout(interVal, delay);
    };

    setTimeout(interVal, delay);

    return {
        cancel: () => {
            clearTimeout(timer);
        }
    };
};

const { cancel } = myTimeInterval(() => {
    console.log(888);
}, 1000);

setTimeout(() => {
    cancel();
}, 4000);
