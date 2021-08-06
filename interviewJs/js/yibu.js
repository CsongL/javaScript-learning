//  参考链接： https://juejin.cn/post/6844903657264136200

// 会进入异步的就是回调那部分的代码
// 任务队列中的任务都是已经完成的异步操作的回调任务
// 在当前的微任务没执行完成时，是不会执行下一个宏任务的
// 回调的那部分就是任务队列中任务所要执行的部分
// 

setTimeout(() =>        //  同步
    console.log(4)     //异步
);                      //同步

new Promise(resolve => { //  同步
    resolve();           //  同步
    console.log(1);      //  同步
}).then(()=>{
    console.log(3);      //  异步
});

console.log(2);          //  同步

//  Evenet.loop()的作用就是确定到底是要执行当前宏任务下的微任务，还是从任务队列中获取另一个宏任务来获取
//  Event.loop()只是负责告诉该执行那些任务，或者说那些回调被触发了，
//  模仿一个简单的Evenet.loop()

// 下面这个是同步代码，所以要在这些执行完毕之后， 才能执行任务队列中的回调函数， 
//  铭记 微任务的执行顺序先于宏任务， 所以先执行promise.then() 再执行setTimeout()中的回调代码
let macroTaskList = [
    ["task1"],
    ["task2", "task3"],
    ["task4"]
];
for(let macroIndex = 0; macroIndex < macroTaskList.length; macroIndex++){
    let microTaskList = macroTaskList[macroIndex];
    for(let mincroIndex = 0; mincroIndex < microTaskList.length; mincroIndex++){
       const mincroTask = microTaskList[mincroIndex];

       if(mincroIndex === 1) microTaskList.push("special micro task");

       console.log(mincroTask);
    }
    if(macroIndex == 2) macroTaskList.push(["special macro task"]);
}

