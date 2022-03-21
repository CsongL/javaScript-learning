# Cookie SessionStorage LocalStorage
Cookie SessionStorage LocalStorage的不同
## 生命周期不同
* Cookie: 通过设置Max-age和Experis来设置过期时间，如果没有设置，那么在浏览器关闭时会被清除
* LocalStorage: 只有在手动清除的时候才会被清除，否则永久保存，主要是做持久化保存
* SessionStorage: 只有在当前页面或当前标签页时才有用, 如果关闭当前页面或当前标签页则存储的数据会失效

## 存储的数据大小不同
* Cookie: Cookie只能存储4KB的数据
* LocalStorage, SessionStorage: 能够存储5MB的数据，只能存储字符串

## Http请求
* Cookie: 当向同一个网址发送请求时，会携带对应的cookie
* LocalStorage, SessionStorage: 只会存储在客户端，不参与与服务器的通信

## 数据共享
* Cookie 根据samesite属性来判断是否应该将cookie放在相应的http请求上
* LocalStorage:  同意浏览器下的同源页面或同源标签页之间可以共享LocalStorage内的数据，非同源的页面之间不能共享LocalStorage
* SessionStorage: 因为SessionStorage是在当前页面或当前标签页下，所以不能再在不同的页面或标签页下共享。即使是同源的页面或同源标签页 

不同的浏览器之间是不能共享任何数据的

sessionStorage 与 localStorage的用法是相同的
```javaScript
const name = 'test';
const value = 'test';
// 设置
sessionStorage.setItem(name, value);
localStorage.setItem(name, value);
// 获取
sessionStorage.getItem(name);
localStorage.getItem(name);
// 获取所有值
// 返回的是一个对象
sessionStorage.valueOf();
localStorage.valueOf();
```