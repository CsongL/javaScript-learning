const number1 = document.querySelector('#number1');
const number2 = document.querySelector('#number2');

const result1 = document.querySelector('.result1');


if(window.SharedWorker){
    const myWorker = new SharedWorker('workers.js');

    number1.onchange = function() {
        myWorker.port.postMessage([number1.value, number2.value]);
        console.log('Message send to worker');
    }

    number2.onchange = function() {
        myWorker.port.postMessage([number1.value, number2.value]);
        console.log('Message send to worker');
    }

    myWorker.port.onmessage = function(e) {
        result1.textContent = e.data;
        console.log(e.lastEventId);
    }

    
}