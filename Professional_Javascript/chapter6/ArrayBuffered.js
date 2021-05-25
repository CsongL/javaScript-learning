const buf = new ArrayBuffer(16); // 
const fullDataView = new DataView(buf);
console.log(fullDataView.byteOffset);
console.log(fullDataView.byteLength);
console.log(fullDataView.buffer == buf);

const partDataView = new DataView(buf, 0, 8);
console.log(fullDataView.byteOffset);
console.log(fullDataView.byteLength);
console.log(fullDataView.buffer == buf);

const secondPartDataView = new DataView(buf, 8);
console.log(secondPartDataView.byteOffset);
console.log(secondPartDataView.byteLength);
console.log(secondPartDataView.buffer == buf)


//  
const buf1 = new ArrayBuffer(2);
const view1 = new DataView(buf1);

console.log(view1.getInt8(0));
console.log(view1.getInt8(1));

console.log(view1.getInt16(0));

view1.setUint8(0,255);
view1.setUint8(1, 0xFF);
console.log(view1.getInt8(0));
console.log(view1.getInt16(0));

const buf2 = new ArrayBuffer(2);
const view2 = new DataView(buf2);

view2.setUint8(0,0x80);
view2.setUint8(1,0x01);
console.log(view2.getUint16(0));
console.log(view2.getUint16(0, true));

view2.setUint16(0, 0x0040, true);
console.log(view2.getUint16(0));
console.log(view2.getUint16(0, true));

console.log(view2.getUint8(0));
console.log(view2.getUint8(1));


const buf3 = new ArrayBuffer(12);
const view3 = new Int32Array(buf3);
console.log(view3.length);
console.log(view3.byteLength);

const ints = new Int32Array([1,2,3,4]);
console.log(ints.length);
console.log(ints.byteLength);
console.log(ints[0]);

const ints2 = new Int16Array(ints);
console.log(ints2.byteLength);

const container = new Int16Array(8);
container.set(Int8Array.of(1,2,3,4));
console.log(container);
container.set([5,6,7,8], 4);
console.log(container);

const source = Int16Array.of(2,4,6,8);
const fullCopy = source.subarray();
console.log(fullCopy);
const partCopy = source.subarray(2);
console.log(partCopy);
const secondCopy = source.subarray(1,3);
console.log(secondCopy);


function typeAarrayConcat(typeArrayConsturctor, ...typeArrays){
    let totalLength =typeArrays.reduce((x,y) => (x.length || x)+ y.length);

    let array = new typeArrayConsturctor(totalLength);
    let currIndex = 0
    for(let eleme of typeArrays){
        array.set(eleme, currIndex);
        currIndex += eleme.length;
    }
    return array;
}
const resultArray = typeAarrayConcat(Int32Array,
    Int8Array.of(1,2,3),
    Int16Array.of(4,5,6),
    Int32Array.of(7,8,9));
console.log(resultArray);