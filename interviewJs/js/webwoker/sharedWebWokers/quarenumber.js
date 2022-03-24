const number = document.querySelector('#number');


const result2 = document.querySelector('.result2');


if(window.SharedWorker) {
    const myWorker = new SharedWorker('workers.js');


    number.onchange = function() {
        myWorker.port.postMessage([number.value, number.value]);
        console.log('Post Message to workers');
    }

    myWorker.port.onmessage = function(e) {
        result2.textContent = e.data;
    }
}