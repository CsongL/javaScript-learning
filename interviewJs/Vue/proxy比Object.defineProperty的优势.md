## proxy相较于Object.defineProperty的优势
### Object.defineProperty的缺点
通过Object.defineProperty无法监控到数组下标的变化，如果我们直接通过数组下标去修改数组的值，那么是不能实施相应的
其次 通过Object.defineProperty只能劫持对象的属性，如果对象的属性是一个对象，那么我们需要进行深度遍历，这样会性能上不太好

### Proxy的主要优势
proxy可以代理整个对象，不需要想Object.defineProxy那样进行深度遍历，从而在性能上有一个较好的提升
除此之外，相较于Object.defineProperty，proxy可以劫持更多的方法，如：deleteProperty，apply, ownKeys等