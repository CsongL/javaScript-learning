// 测试用例
// sum(1, 2, 3).valueOf(); // 6
// sum(2, 3)(2).valueOf(); // 7
// sum(1)(2)(3)(4).valueOf(); //10
// sum(2)(4, 1)(2).valueOf(); //9
// sum(1)(2)(3)(4)(5)(6).valueOf(); // 21

function sum(...args) {
    const f = (...ret) => sum(...args, ...ret);
    f.valueOf = () => args.reduce((prev, curr) => prev + curr);
    return f;
}

console.log(sum(1)(2)(3)(4)(5)(6).valueOf());