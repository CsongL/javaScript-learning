var name = "windowsName";
function a() {
    var name = "Hot";

    console.log(this.name);

    console.log("inner" + this);
}

a();
console.log("outer:" + this);