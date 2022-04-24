function parse(url) {
    // 先根据正则表达式拿出url后面传递过来的params
    let queryString = url.match(/\?([^/?#:]+)#?/)?.[1];

    if(!queryString) {
        return {};
    }

    let queryObj = queryString.split('&').reduce((paramObj, block) => {
        let [key, value] = block.split('=');
        let _k = decodeURIComponent(key);
        let _v = decodeURIComponent(value);

        if(!paramObj[_k]) {
            paramObj[_k] = [].concat(paramObj[_k], _v);
        } else {
            paramObj[_k] = _v;
        }
        return paramObj;
    }, {});
    
    return queryObj;

}