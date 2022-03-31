// 控制并发数量
function pMap(list, mapper, concurrency = Infinity) {
    list = Array.from(list);

    return new Promise((resolve, reject) => {
        let currIndex = 0;
        let resolveCount = 0;
        let result = [];
        let len = list.length;
        function next() {
            let index = currIndex;
            currIndex++;
            Promise.resolve(list[index])
            .then((o) =>{
                console.log(index);
                return mapper(o, index);
            }).then((o) => {
                result[index] = o;
                resolveCount++;
                if(resolveCount === len) {
                    resolve(result);
                } 
            });
        }
        for(let i = 0; i< concurrency && i < len; i++) {
            next();
        }
    });
}

pMap([1,2,3], x => x * 3).then((o) =>{
    console.log(o); 
})

pMap([1, 2, 3, 4, 5], (x) => Promise.resolve(x + 1)).then((o) => {
    console.log(o);
});
