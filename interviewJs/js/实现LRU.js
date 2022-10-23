// LRU 机制
// get(key): 获取key值对应的value值，要是key值存在，则返回相应的value值, 要是不存在返回 - 1
// put(value): 设置key值对应的value值，要是空间已满，则删除最久没有使用的值，从而去存储
// 要求：get和put的时间复杂度为O(1)

// 分析： 因为要求时间复杂度为O(1), 则为了实现快速存储，则需要选择map去实现
// 其次 map会记录每次添加的顺序，在获取的时候，可以所要获取的值进行删除，从而再去重新赋值，从而对该值的使用进行更新

class URL {
    constructor(size) {
        this.size = size;
        this.cache = new Map();
    }

    get(key) {
        const hasKey = this.cache.has(key);
        if (hasKey) {
            const value = this.cache.get(hasKey);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } 
        return -1;
    }

    put(key, value) {
        const hasKey = this.cache.has(key);
        if (hasKey) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.size) {
            this.cache.delete(this.keys().next().value);
        }
    } 
}