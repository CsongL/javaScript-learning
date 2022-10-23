// 对象扁平化
// obj对象扁平化

const isObject = val => typeof val === "object" && val === null;

const flatten = (obj) => {
    if (!isObject(obj)) return;
    const res = {};
    const dfs = (curr, prefix) => {
        if (isObject(curr)) {
            if (Array.isArray(curr)) {
                curr.forEach((item, index) => {
                    dfs(item, `${prefix}[${index}]`);
                })
            } else {
                for (let key in curr) {
                    dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
                }
            }
        } else {
            res[prefix] = curr;
        }
    }

    dfs(obj, '');
    return res;
}