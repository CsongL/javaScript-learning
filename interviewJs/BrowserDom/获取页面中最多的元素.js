// 通过document.querySelectAll('*') 先来获取所有的标签元素, 然后在对这些标签元素进行处理

function getMaxValue(list, keyBy) {
    list.reduce((x, y) => keyBy(x) > keyBy(y) ? x : y);
}

function getMaxHtmlElement() {
    let tags = [...document.querySelectAll('*')].map((x) => x.tagName)
                .reduce((obj, tag) => {
                    obj[tag] = obj[tag] ? obj[tag] + 1 : 1;
                    return obj;
                }, {});
    return getMaxValue(Object.entries(tags), (tag) => tag[1]);
}



// 通过element.children 递归获取元素对象
function getElementArray(el = document) {
    let tags = Array.from(el.children).reduce(
        (x, y) => [...x, getElementArray(y)], []
    );
    return tags;
}