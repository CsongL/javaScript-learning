// implement _.get(source, path, default)

// Test cases
const object = { a: [{ b: { c: 3 } }] };

//=> 3
console.log(get(object, "a[0].b.c"));

//=> 3
console.log(get(object, 'a[0]["b"]["c"]'));

//=> 10086
console.log(get(object, "a[100].b.c", 10086));


// implement 
function get(source, path, defaultValue = undefined) {
    const paths = path.replace(/\[(\w+)\]/g, '.$1')
                .replace(/\["(\w+)"\]/g, '.$1')
                .replace(/\['(\w+)'\]/g, '.$1')
                .split('.');
    console.log(paths);
    let result = source;
    for(const key of paths) {
        result = result?.[key];   // ?.是一个可选链操作符， 如果这个对象的属性没有定义 或者属性的值为null 那么该断言会返回undefined, 如果这个对象的属性被定义且有值，那么就会返回相应的值
    }
    result = result === undefined ? defaultValue : result;
    return result;     
}
