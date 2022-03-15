# 设置SameSite以防止CSRF(Cross Site Request Forgery Protection)
SameSite可以设置为三个值：None, Lax, strict
其中设置为Lax, strict可以预防CSRF攻击的发生
## Lax
SameSite 默认值就是Lax, 但 `SameSite: Lax`时 只会在导航到目标网址的GET请求时发送相应的Cookie, 
导航到目标网址时的情况主要是：连接, 预加载请求和Get表单
只有在这三种情况下，才会发送cookie请求

## strict
当`SameSite: strict`时，不能向任何第三方网站发送cookie

## none
当`SameSite: None`时， 可以向任何第三方网站发送cookie,但必须要设置secure属性（也就是说该请求必须通过Https协议发送）