## Map 与 WeakMap的区别
### Map
Map允许任何的数据类型作为键值，map中的键值不会突然被垃圾回收机制所回收，所以map支持各种遍历操作，例如map.keys(), map.values(), map.entries()等。

### WeakMap
WeakMap 只允许引用类型的数据作为其键值，如果缺少对该引用类型数据的引用，那么该引用数据类型可能会被垃圾回收机制回收，而因为作为键的该引用数据类型可能不知道在什么时候就会被垃圾回收机制回收，所以WeakMap不支持任何遍历自身的方法，例如： weakMap不支持keys()， values(), entities()等， WeakMap只支持四种方法：get(), set(), has()， delete();
除此之外，WeakMap()无法清除，即不支持clear方法。