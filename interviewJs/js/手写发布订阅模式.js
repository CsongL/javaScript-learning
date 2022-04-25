const e = require("express");

class EventEmitter{
    constructor() {
        this._events = {};
    }

    addEventListener(eventName, callBack, isOnce) {
        let eventObj = {
            callBack,
            isOnce
        };
        const callBacks = this._events[eventName] || [];
        callBacks.push(eventObj);
        this._events[eventName] = callBacks;
    }

    on(eventName, callBack) {
        this.addEventListener(eventName, callBack, false);
    }

    once(eventName, callBack) {
        this.addEventListener(eventName, callBack, true);
    }

    emit(eventName, ...args) {
        let callBacks = this._events[eventName] || [];
        let onceTasks = [];
        callBacks.forEach((item, index) => {
            const {callBack, isOnce} = item;
            callBack && callBack(...args);
            if(isOnce) {
                onceTasks.push(index);
            }
        });
        onceTasks.forEach(item => {
            callBacks.splice(item, 1);
        });
    }

    off(eventName, callBack = undefined) {
        if(!callBack) {
            this._events[eventName] = [];
        } else {
            let callBacks = this._events[eventName] || [];
            let newCallBacks = callBacks.filter((fnObj) => fnObj.callBack != callBack );
            this._events[eventName] = newCallBacks;
        }
    }
}

const event = new EventEmitter();

event.on('hello', function(message) {
    console.log('hello' + message);
});

event.emit('hello', 'cai');

event.once('hello', function(message, name) {
    console.log('hello once' + message + name);
});

event.emit('hello', 'mes', 'zhang');
event.emit('hello', 'test');


event.off('hello');

event.on('test', function(msg) {
    console.log('test' + msg);
});
const test2 = function(msg) {
    console.log('test2' + msg);
}
event.on('test', test2);
event.emit('test', 'msg');


event.off('test', test2);
event.emit('test', 'msg');
