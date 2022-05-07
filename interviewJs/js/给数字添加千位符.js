// 输入数字，给数字添加千位符
function numberThousands(number, thousandsSeperator = ',') {
    return String(number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
    "$1" + thousandsSeperator);
}