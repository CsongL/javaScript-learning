# Vue/React路由实现的基本原理
Vue/React路由实现的基本原理就是 **监听url的变化**。 监听url的变化可以通过 hash 和 history 来实现对路由的监听工作
## hash
Hash url 的样子 `www.a.com/#/` `#`后面的就是哈希值， 不同的url 对应的hash值也不同，但url的`#`后的hash值发生变化后，会触发`hashchange`事件，通过监听hashchangge 事件 我们就可以监听到url变化

```javascript
    监听url 的变化 并且做出相应的操作
    function urlChange() {
        if(location.hash = '#foo') {
            console.log('foo 页面');
        }
    }

    window.addEventListener('hashchange', urlChange);
```

## history
history 是定义在 window对象上的一个属性，这个属性对象的值也是一个对象， history对象提供了对会话历史记录的访问
history 通过 history.back() 模拟 浏览器后退按钮， history.forward() 模拟浏览器前进按钮 
        history.go() 会指定跳转到相对位置的历史记录，数字作为参数，当前激活的历史记录项的位置相当于0， -1相当于后退， 1相当于前进一个

history对象通过 History.pushState() 和 History.replaceState()来添加和修改历史记录中的条目

history.pushState(状态对象, 标题， url): 状态对象是我们定义的关于这个历史记录条目的一个对象，标题也是自定义的， url就是对应的路径url
history.replaceState(状态对象， 标题， url) 该方法是修改了当前的历史记录项而不是新建一个

### history 如何监听 url变化 
#### 通过 `popstate` 事件
但当前激活的历史记录条目发生变化时，会触发popstate事件， 而且 如果当前的激活的历史记录条目是由history.pushState()创建或有history.replace()修改，那么 popstate事件对象上的state属性对应的值是当前激活的历史记录条目的state对象的一个拷贝，从而可以通过popstate事件上的state对象获取相应的属性

#### popstate事件触发条件
popstate 事件不能被history.pushState() 和 history.replaceState()触发，而是会被 history.back(), history.forward(), history.go()所触发或者对应的浏览器前进，后退等操作触发

简单的说就是我们通过history.pushState()和history.replaceState()这两个方法所创建或修改的历史记录条目 在激活的状态下被通过一些方式修改后，会触发popstate事件，从而我们可以监听这个事件 并且这个事件的state属性是我们所创建或修改的历史记录的条目的拷贝，从而我们可以通过state属性进行一些操作 

//eg
```javascript
    // 监听popstate事件，这个事件就是用来监听url的变化
    window.popstate = function(event) {
        console.log("location:" + document.location + ", state:" + JSON.stringify(event.state));
    }

    history.pushState({page: 1}, 'page 1', '?page=1'); // 添加并激活一个历史记录条目
    history.pushState({page: 2}, 'page 2', '?page=2'); // 添加并激活一个历史记录条目
    history.replaceState({page: 3}, 'page 3', '?page=3') // 替换当前激活的历史记录条目
    // http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
    history.back() // 触发popstate事件，调用window.popstate所对应的函数
                 // 输出 "location: http://example.com/example.html?page=1, state: {"page":1}"
    history.back() // 触发popstate事件 
                   // 输出 "location: http://example.com/example.html, state: null  
                   // state 是null的原因是 因为 history.replaceState() 是 替换了第二个历史记录条目，后退两次之前的历史记录条目也不是由history.pushState()创建 所以 event.state属性为null
    history.go(2); // 输出 "location: http://example.com/example.html?page=3, state: {"page":3}
```