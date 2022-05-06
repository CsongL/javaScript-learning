let obj1 = {
    name: 'cai'
}

let obj = {
    name: 'meng'
}

function returnArrowFn() {
    return () => {
        console.log(this.name);
    };
}

const arrowFn = returnArrowFn.call(obj1);

arrowFn();

const arrowFn1 = returnArrowFn.call(obj);

arrowFn1();