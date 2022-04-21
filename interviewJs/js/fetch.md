## fetch
### fetch 中的credentials字段
通过fetch发送请求时，我们可以通过参数来设置所发送的请求
其中 credentials参数，主要是用来设置在通过fetch发送请求时，是否携带cookie
* 当 credentials: 'omit'时，发送的请求不会携带cookie
* 当 credentials: 'same-origin'时，只有向同源的网址发送请求时，才会携带cookie
* 当 credentials：'include'时，不论是向哪一个网站发送请求，都会携带cookie

