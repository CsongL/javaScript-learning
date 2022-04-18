// 通过使用async/await 实现与 Promise.all 相同的效果
// 例子 const [u1, u2, u3] = Promise.all([getUser(1), getUser(2), getUser(3)])


// 第一种方式
const user1 = getUser(1);
const user2 = getUser(2);
const user3 = getUser(3);

const u1 = await user1;
const u2 = await user2;
const u3 = await user3;


// 第二种自己Pollyfill一个Promise.all
function all(list) {
    return new Promise((resolve, reject) => {
        let count = 0;
        if(!list && list.length === 0) {
            resolve([]);
        }
        let n = list.length;
        let result = new Array(n).fill(0);
        list.forEach(async (item, index) => {
            try{
                let r = await item;
                result[index] = r;
                count++;
                if(count === n ) {
                    resolve(result);
                }
            } catch(e) {
                reject(e);
            }
        });
    });
}
