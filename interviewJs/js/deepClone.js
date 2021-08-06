function deepClone(object){
    if(object == null) return object;
    if(typeof object != "object") return object;
    let clone;
    if(isType(object, 'Array')){
        clone = [];
    }else if(isType(object, 'Date')){
        clone = new Date(object.getTime());
    }else if(isType(object, 'RegExp')){
        clone = new RegExp(object.source, getRegExp(object));
        if(object.lastIndex) clone.lastIndex = object.lastIndex;
    }else{
        clone = Object.create(Object.getPrototypeOf(object));
    }
    for(let i in object){
        clone[i] = deepClone(object[i])
    }
    return clone;
}

const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        break;
      default:
        flag = false;
    }
    return flag;
  };

  let a = {
      "zz": 2,
      "test": [1,2,3]
  }
  console.log(deepClone(1));