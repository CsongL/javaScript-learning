// 实现一个类去 该类可以限制并发的数量，
// 通过数组存储已经添加的任务, 通过数量去记录并发执行的promise的数量


class Schedule {
    constructor(limit) {
        this.count = 0;
        this.limit = limit;
        this.queue = [];
    }

    addTask(order, time) {
        const newPromise = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order);
                    resolve();
                }, time);
            });
        };
        this.queue.push(newPromise);
    }

    taskStart() {
        for (let i = 0; i < this.limit; i++) {
            this.request();
        }
    }

    request() {
        if (!this.queue.length || this.count >= this.limit) return;
        this.count++;
        this.queue.shift()().then((result) => {
            this.count--;
            this.request();
        });
    }
}

const schedule = new Schedule(2);
schedule.addTask("1", 1000);
schedule.addTask("2", 500);
schedule.addTask("3", 300);
schedule.addTask("4", 200);
schedule.addTask("5", 400);

schedule.taskStart();
