# CSP(Content-Security-Policy)
## 介绍
Content-Security-Policy 其实就是用来限制和规定网页上只允许加载哪些来源的脚本和内联样式，通过设置CSP从而来阻止XSS攻击
设置Content-Security-Policy 的方法主要有两种
    1. 服务器在返回的http响应的头部设置Content-Security-Policy属性，并且设置相应的值
    2. 另一种是通过<Meta>标签来开启 `<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">`
主要介绍的是服务器通过设置响应头中的Content-Security-Policy属性来对脚本的加载进行限制

## 用于限制资源加载的主要属性
script-src: 限制脚本的来源
style-src: 限制样式表的来源
img-src: 图像
media-src: 媒体文件的来源(音频和视频)
font-src: 限制字体的来源
object-src: 限制插件的来源
child-src: 限制加载的框架的来源
frame-ancestors: 嵌入的外部资源
connect-src: HTTP 连接
worker-src: worker脚本
manifest-src: manifest文件

### default-src
用来设置所有的属性的值：
`Content-Security-Policy: default-src 'self'`
限制所有的资源只能从自身的网站上加载

### 限制网页和其他url发生来联系

* frame-ancestors：限制嵌入框架的网页
* base-uri：限制<base#href>
* form-action：限制<form#action> 

### script-src属性的特殊值
* 'unsafe-inline'：允许执行页面内嵌的&lt;script>标签和事件监听函数
* unsafe-eval：允许将字符串当作代码执行，比如使用eval、setTimeout、setInterval和Function等函数。
* **nonce值**：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行
* **hash值**：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。

#### nonce值例子
服务器发回响应时，告诉浏览器随机生成的一个nonce token
`Security-Content-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'`
网页加载的脚本资源上必须要有这个nonce值，浏览器才能加载该脚本
`<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  // some code
</script>`

### hash值例子
服务器发回响应时，告诉浏览器根据脚本生成的一个hash值
`Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='`
只有当脚本计算出的哈希值与浏览器响应头部的哈希值相同时,才能加载该脚本

##注意点
1. **script-src** 和 **object-src** 必须设置, 除非设置了default-src
2. script-src不能使用unsafe-inline关键字（除非伴随一个nonce值），也不能允许设置data:URL。


## Reference
http://www.ruanyifeng.com/blog/2016/09/csp.html
