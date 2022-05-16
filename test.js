function fakeInstanceOf(obj, constructor) {
  const proto = constructor.prototype;
  while(true) {
    if(!obj) {
      return false;
    }
    if(Object.is(obj, proto)) {
      return true;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

console.log(fakeInstanceOf([], Array));
console.log(fakeInstanceOf({}, Object));
console.log(fakeInstanceOf(Number(1), Number));