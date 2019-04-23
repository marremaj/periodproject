var mylist = [
            {_id: 1, date: new Date(2019, 2, 10)}, 
            {_id: 2, date: new Date(2019, 3, 10)}, 
            {_id: 3, date: new Date(2019, 4, 10)}
           ];
loadDoc();
function listElements(list) {
    var table = document.getElementById("list");
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        var row = document.createElement("tr");
        row.setAttribute("class", "element");
        var id = document.createElement("td");
        var date = document.createElement("td");
        var text1 = document.createTextNode(element["_id"]);
        var dateformat = new Date (element["date"]).getDate() + "/" + (new Date(element["date"]).getMonth()+1) + "/" + new Date(element["date"]).getFullYear();
        var text2 = document.createTextNode(dateformat);
        id.appendChild(text1);
        date.appendChild(text2);
        row.appendChild(id);
        row.appendChild(date);
        table.appendChild(row);
    }
}

var newInput = document.getElementById("inputButton");
newInput.addEventListener("click", addDoc);

function getInput() {
    var newInput = document.getElementById("addinput");
    var value = newInput.value;
    console.log(newInput.value, typeof(newInput.value));
    var list = value.split("-")
    console.log(new Date(list[0], list[1] - 1, list[2]));
    console.log("done");
    loadDoc();
}

function addDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "addElement", true);
    xhttp.send();
}

function showAVG(nr) {
    var g = Math.round(nr / (1000 * 60 * 60 * 24));
    document.getElementById("avgBox").innerText = g + " days";
}

function showNext(nr) {
    var date = new Date(nr);
    var thing = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    document.getElementById("nextBox").innerText = thing;
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var result = JSON.parse(this.responseText);
            listElements(result[2]);
            showAVG(result[0]);
            showNext(result[1]);
        }
    };
    xhttp.open("GET", "getList", true);
    xhttp.send();
}

function rmTable() {

}