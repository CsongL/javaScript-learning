## DOCTYPE and meta

## DOCTYPE
`DOCTYPE` 是 Document Type的缩写，表示的是文档的类型，DOCTYPE的声明位于文档最前面的位置，标签之前
通过  `<!DOCTYPE html>`的声明，可以让浏览器知道该文件是一个html类型的文档，从而浏览器知道应该以什么样的文档标准来解析这个文档
### 三种不同的文档解析类型
    * 标准模式：当我们使用了 `<!DOCTYPE html>`, 浏览器就会使用该标准来解析文档，而页面也就会按照标准的html和css定义来解析
    * 怪异模式：如果我们在文档中没有声明文档的类型(即我们没有使用 `<!DOCTYPE html>`)， 那么浏览器就会使用这个模式来解析文档，浏览器会模拟更旧的浏览器行为
    * 近乎标准: 会实施一种表格单元格尺寸的怪异行为

### HTML XML XHTML的区别
 * HTML(超文本标记语言)：在html4.0之前HTML先有实现再有标准，导致HTML异常混乱和松散
 * XML(可扩展标记语言)： 用来存储数据和结构，可扩展
 * XHTML(可扩展超文本标记语言): 是基于上面两个而来，为了解决html混乱问题而生，并基于此诞生了html5,也就是开头加入 `<!DOCTYPR html>`的由来


可以通过 `document.doctype`来获取当前文档的类型，返回的是一个DocumentType对象,如果该文档没有声明DOCTYPE, 那么就返回null

## meta
`<meta>`是出现在<head>中的一个标签, 它是由name和content两个属性来定义的，用来描述一个HTML网页的元信息。 例如作业，日期，时间，网页描述等

## name属性可能取得的值：
* author: 这个html文档的作业  `<meta name="author" content="xxx">`
* description: 网页描述 `<meta name="description" content="xxx">`
* referrer：可以控制从该文档发出的HTTP请求中的HTTP Referer头的值
* charset：网页编码形式 `<meta charset="utf-8">`
* http-equiv: 相当于http的头部，可以用来设置http 头部的一些属性。例如 `<meta http-equiv="expires" content="Wed,20 Jun 2019 22:33:00 GMT">`
* viewpoint: web开发人员可以控制的视口大小和比例，例如 `<meta name="viewpoint" content="width=device-width, initial-scale=1.0， maximum-scale="1.0">`
