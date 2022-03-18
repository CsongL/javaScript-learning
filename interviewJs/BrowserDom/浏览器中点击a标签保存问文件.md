# 浏览器中点击a标签保存为文件
1. 设置a标签的download属性，当点击a标签时，浏览器会将dowanload属性指定的内容保存为文件，文件名就位download属性的值
2. 在a标签url所对应的服务器在响应头设置 content-disposition: attachement; filename="filename.jpg"也可以实现下载

总结
要么 设置a标签的download属性，要么要求服务器端设置响应头content-disposition: attachement; filename="filename.jpg"属性
