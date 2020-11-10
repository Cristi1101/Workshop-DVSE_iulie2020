var vehiclesjson = '[{"manufactures": "Ford","model": "Focus","year": 2015,"color": "Gray"},{"manufactures": "Bmw","model": "X3","year": 2017,"color": "Black"}, {"manufactures": "VW","model": "Passat","year": 2001,"color": "Red"},{"manufactures": "Opel","model": "Corsa","year": 2013,"color": "Red"}]';
var tiresjson = '[{"brand":"Pirelli","season":"Winter","articleCode":"205/55..","price":"100.75"},{"brand":"GoodYear","season":"Summer","articleCode":"205/55..","price":"87.75"},{"brand":"Dunlop","season":"All","articleCode":"205/75..","price":"185.5"},{"brand":"Continental","season":"Winter","articleCode":"205/55..","price":"205.5"}]';

var vehicles = JSON.parse(vehiclesjson);
var tires = JSON.parse(tiresjson);

document.addEventListener("DOMContentLoaded", function(){
    var tableVehicle = document.getElementById("vehicle");
    var tableTire = document.getElementById("tires");

    for(var i = 0; i < vehicles.length; i++){
        var row = document.createElement("div");
        row.className = "row";

        for(var prop in vehicles[i]){
            var cell = document.createElement("div");
            var text = document.createTextNode(vehicles[i][prop]);
            cell.appendChild(text);

            row.appendChild(cell);
        }

        var btnCell = document.createElement("div");

        var btn = document.createElement("button");
        btn.innerText = "Select";
        btn.className = "btn arrow";

        btnCell.appendChild(btn);
        row.appendChild(btnCell);
        tableVehicle.appendChild(row);
    }

    for(var i = 0; i < tires.length; i++){
        var row = document.createElement("div");
        row.className = "row";

        for(var prop in tires[i]){
            var cell = document.createElement("div");
            var text = document.createTextNode(tires[i][prop]);
            cell.appendChild(text);

            row.appendChild(cell);
        }

        var btnCell = document.createElement("div");

        var btn = document.createElement("button");
        btn.innerText = "Add to cart";
        btn.className = "btn add";

        btnCell.appendChild(btn);
        row.appendChild(btnCell);
        tableTire.appendChild(row);
    }

    var elements = document.getElementsByClassName("row");

    var getRow = function(){
        document.querySelector(".tires").style.display = "block";
    }

    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('click', getRow);
    }

    var product = document.getElementById("products");

    var cartElements = document.getElementsByClassName("add");

    function addToShoppingBasket(){
        var value = product.innerText;
        value = parseInt(value);
        value++;
        product.innerText = value;
    }

    for(var i = 0; i < cartElements.length; i++){
        cartElements[i].addEventListener('click', addToShoppingBasket);
    }
});