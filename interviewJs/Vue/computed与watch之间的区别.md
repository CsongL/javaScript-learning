## computed 与 watch 之间的区别
先说结论 computed 得到的是一个响应式对象，而 watch是当监听的值发生变化时，会触发对应的函数



### watcher
watcher就是监听一个变量，当这个变量发生变化时，会执行对应的函数，有点像事件监听一样
我们可以监听 父组件传递过来的属性，以及父组件定义的data 和 computed属性

例如 我们经常用到的例子，填入 姓 和 名得到对应的中文名字，通过watcher我们可以这样写
```vue
export default {
    name: 'watch',
    data() {
        return {
            firstName: '',
            lastName: '',
            fullName: this.firstName + ' ' + this.lastName,
        }
    },
    watch: {
        firstName: function() {
            this.fullName = this.firstName + ' ' + this.lastName;
        },
        lastName: function() {
            this.fullName = this.firstName + ' ' + this.lastName;
        }
    }
}
```

### computed
通过computed我们得到的是一个新的响应式数据，computed其实本质上就是对数据的一个二次封装，
就是说当一个数据发生变化时，那么依赖于这个数据的那个响应式数据也就会发生变化
例子 还是 根据姓和名得到对应的中文名字，通过computed我们可以这样写
```vue
export default {
    name: 'computed',
    data() {
        return {
            firstName: '',
            lastName: '',
        }
    },
    computed:{
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        }
    }
}
```


### Difference between computed and watch
1. 最本质的区别 computed创建了新的响应式数据，而watch是监听数据的变化，从而调用相应的函数
2. computed所创建的新的响应式数据其实就是对之前所有的数据的一个二次封装，而watcher 则是通过监听数据的变化，从而执行相应的函数
3. computed对象中属性所对应的函数要有返回值，这个返回值就是computed所创建的新的响应式数据的值
4. computed是懒惰的，只有当我们使用到computed对象中的属性时，才会执行对应的函数进行计算，而watcher是只要监听的数据发生变化，那么就会执行对应的监听函数
5. computed对象所得到的响应式数据的值是被缓存起来的，只要依赖的数据发生变化了，才会重新进行计算
6. computed比watcher更直观一些
7. watcher更适合执行异步的一些任务，例如监听电影种类的变化，从而获取到不同种类电影对应的数据，而computed则是直接要返回数据
