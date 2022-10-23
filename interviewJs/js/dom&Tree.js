// dom 形式
//
/*
<div>
    <span></span>
    <ul>
        <li></li>
        <li></li>
    </ul>
</div> 
*/
// tree 形式
/*
{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}
*/


// dom 转换位树状对象结构
const dom2Tree = (dom) => {
    const obj = {};
    obj.tag = dom.tagName;
    obj.children = [];
    dom.childNodes.forEach((dom) => obj.children.push(dom2Tree(dom)));
};



// 树状对象结构转换位dom元素
const _render = (vNode) => {
    // 数字类型的vNode转换为字符串
    if (typeof vNode === "number") {
        vNode = String(vNode);
    }
    // 字符串类型的vNode直接返回相应的文本节点
    if (typeof vNode === "string") {
        return document.createTextNode(vNode);
    }

    // 普通dom
    const dom = document.createElement(vNode);
    if (vNode.attrs) {
        Object.entries(vNode.attrs).forEach(([key, value]) => {
            dom.setAttribute(key, value);
        });
    }

    vNode.children.forEach((child) => dom.appendChild(_render(child)));
    return vNode;
};

