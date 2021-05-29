// generator
function *generatorFun(){};
let g = generatorFun();
console.log(g);
console.log(g.next());

function *generatorFun1(){
    console.log("foo");
}

let g1 = generatorFun1();
console.log(g1);
console.log(g1.next());

function *generatorFun2(){
    yield 1;
    yield 2;
    yield 3;
}
let g2 = generatorFun2();
for(let e of g2){
    console.log(e);
}
let g2_1 = generatorFun2();
console.log("test yield");
console.log(g2_1.next());
console.log(g2_1.next());
console.log(g2_1.next());

function *generatorFun3(n){
    while(n--){
        yield n;
    }
}

let g3 = generatorFun3(4);
for(let e of g3){
    console.log(e);
}

console.log("yield *");
function *generatorFun4(){
    yield* [1,2,3];
}
let g4 = generatorFun4();
for(let e of g4){
    console.log(e);
}

// yield input
function *generatorFun5(initial){
    console.log(initial);
    console.log(yield);
    console.log(yield);
}

let g5 = generatorFun5("foo");
console.log(g5.next("zzz"));
console.log(g5.next("test"));
console.log(g5.next("ttt"));

function *generatorFun6(n){
    if(n>0){
        yield* generatorFun6(n-1);
        yield n;
        yield n-1;
    }
}
for(let e of generatorFun6(4)){
    console.log(e);
}

class Node{
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }
    connect(node){
        if(node != this){
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

class RandomGraph{
    constructor(size){
        this.nodes = new Set();
        
        for(let i=0; i< size; i++){
            this.nodes.add(new Node(i));
        }
        const threshold = 1/size;
        for(let x of this.nodes){
            for(let y of this.nodes){
                if(Math.random() > threshold){
                    x.connect(y);
                }
            }
        }
    }

    print(){
        for(let node of this.nodes){
            const ids = [...node.neighbors].map((n)=> n.id).join(",");
            console.log(`${node.id}: ${ids}`);
        }
    }
}

let randomGraph = new RandomGraph(4);
randomGraph.print();