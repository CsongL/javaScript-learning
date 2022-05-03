## ajax实现原理
ajax本质是那个就是基于XmlHttpRequest实现的，它的原理就是
1. 创建XMLHttpRequest的实例对象
2. 通过XMLHttpRequest的实例对象的open()方法来建立与服务器端的连接
3. 通过XMLHttpRequest的实例对象的send()方法来发送请求体的数据
4. 通过监听XMLHttpRequest的readystate属性值的变化，来判断请求是否完成， 监听readystate状态变化的事件是onreadystatechange
5. 最后通过XMLHttpRequest的实例对象的responseText属性来获取服务器端返回的响应数据

### XMLHttpRequest.open
`xml.open(method, url[, async][, user][, password])`
method: 表示请求的方法 get, post, put, delete
url: 表示请求的网址
async: 表示异步执行操作，默认为true
user: 可选的用户名用于认证，默认为null
password: 可选的密码用于认证，默认为null

### XMLHttpRequest.send()
`xml.send([body])`
body: 请求体
如果是get方法，则应该在url中发送相应的请求参数，并且send方法中的参数应该设置为null，xml.send(null)
如果是post方法，则应该在send()方法中发送相应的请求参数

### XMLHttpRequest.readystate
readystate主要有五中状态值
|---|---|---|
|值|状态|描述|
|0|UNSENT（初始状态，未打开）|已经生成了xml实例对象，但还没有调用open()方法|
|1|OPENED（以打开，未发送）|已经调用了open()方法，但还没有调用send()方法|
|2|HEADERS_RECEIVED（以获取响应头）|已经获取到了响应头和状态码|
|3|LOADING（正在下载响应体）|正在下载响应体中的数据|
|4|DONE（整个数据传输过程结束）|整个数据的传输过程结束|

```js
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(request.readyState === 0) {
        console.log('请求初始化，还没有调用open()');
    } else if(request.readyState === 1) {
        console.log("调用了open（）方法，但是还没有调用send()方法");
    } else if(request.readyState === 2) {
        console.log("调用了send（）方法，已经接受到了响应头和状态码");
    } else if(request.readyState === 3) {
        console.log("正在下载响应体数据");
    } else if(request.readyState === 4) {
        if(request.status >= 200 && request.status <= 300) {
            console.log(request.responseText);
        } else if(request.status >= 400) {
            console.log('请求失败');
        }
    }
}

request.open("get", "https://www.baidu.com");
request.send(null);
```


### 通过XMLHttpRequest实现ajax

```js
function ajax(options) {
    const request = new XMLHttpRequest();
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    const params = options.data;

    if(options.type === "GET") {
        request.open('get', options.url + "?" + params, true);
        request.send(null);
    } else if(options.type === 'POST') {
        request.open('post', options.url, true);
        request.send(params);
    }

    request.onreadystatechange = function() {
        if(request.readyState === 4) {
            let status = request.status;
            if(status >= 200 && status <= 300) {
                options.success && options.success(request.responseText, status);
            } else if(status >= 400) {
                options.fail && options.fail(status);
            }
        }
    }
}


ajax({
    type: 'get',
    url: 'https://www.baidu.com',
    data: 'a=1&b=2',
    dataType: 'json',
    success: function(responseText, status) {
        console.log(responseText);
    },
    fail: function(status){
        console.log('error status: ' + status)
    }
})
```


```