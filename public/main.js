var xhr = new XMLHttpRequest();
xhr.open("post", "/cor");

xhr.onload = function () {
    console.log(this.responce);
}
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({ a: 1, b: 2 }));