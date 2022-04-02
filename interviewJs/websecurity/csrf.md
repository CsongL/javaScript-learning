## CSRF 跨站请求伪造
1. 用户在正常的网络上成功登录，服务器返回相应的cookie
2. 攻击者诱导用户打开一个恶意网站并执行一些恶意操作，这个操作会向正常的服务器发送一个请求, 这个请求本身会携带相应的cookie信息，从而使得服务器认为这是用户自身的操作
eg 例如下面这段恶意的代码
```html
<form action="https://baidu.com" method="post" display="hidden">
    <input type="text" label="新密码" value="1234">
    <input type="text" label="确认新密码" value="1234">
    <button id="submit">submit</button>
</form>

<script>
    // 恶意代码
    document.getElementById('submit').onclick = function() {
        document.getElementById('form').submit();
    }
</script>
```

上述这段代码会在用户不知情的情况下修改了用户的密码
这就是 csrf攻击，利用用户的身份认证信息，来进行一些攻击

## 预防csrf攻击
1. 在每个请求中携带一个token, 当用户成功登录时，服务器可以返回一个token, 客户端可以将这个token存储到seesion中，每次发送请求时，手动将其添加到请求头部或者请求cookie中， 当服务器接收到请求后，会先验证token是否合法，如果合法则对请求进行处理
2. 通过HTTP Referer头部来判断该请求来自于哪一个页面，如果是正常网站的页面，那么服务器会处理该请求，但这种方法也并不一定安全，因为HTTP Refer字段是由客户端自己添加的，如果客户端本身都存在漏洞，那么HTTP Referer字段也是不准确的