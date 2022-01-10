// console.log(module.parent);
// console.log(module.children);
if(!module.parent) {
    console.log('I am in my own module, ' + module.name);
} else {
    console.log('I am not in my own module, ' + module.name);
}