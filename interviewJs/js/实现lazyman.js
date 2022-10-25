// 实现lazyman函数

class LazyMan {
    constructor(name) {
        this.tasks = [];
        const task = () => {
            console.log(`I am ${name}`);
            this.next();
        };

        this.tasks.push(task);
        setTimeout(() => {
            this.next();
        }, 0);
    }

    next() {
        const task = this.tasks.shift();
        task && task();
    }

    sleep(time) {
        this.sleepWrapper(time, false);
        return this;
    }

    sleepFirst(time) {
        this.sleepWrapper(time, true);
        return this;
    }

    sleepWrapper(time, first) {
        const task = () => {
            setTimeout(() => {
                console.log(`ware up after ${time}s`);
                this.next();
            }, time * 1000);
        };
        if (first) {
            this.tasks.unshift(task);
        } else {
            this.tasks.push(task);
        }
    }

    eat(food) {
        const task = () => {
            console.log(`eat ${food}`);
            this.next();
        };

        this.tasks.push(task);
        return this;
    }
}

const lazyMan = (name) => new LazyMan(name);

lazyMan('Hank').sleep(2).eat("apple");
lazyMan('Hank').eat('apple').sleepFirst(2);