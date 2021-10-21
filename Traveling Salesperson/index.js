//if(innerWidth<=425){
    var tela ={width: innerWidth, height: innerHeight - 8}
//}else{
    //var tela = {width: innerWidth - 500, height: innerHeight - 8}
//}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;

const c = canvas.getContext('2d');



var cities = [];
var totalCities = 10;

var order = [];

var population = [];

var recordDistance;
var bestEver;

var statusP;

function setup(){
    
    var order = [];
    for(var i = 0; i < totalCities; i++){
        var v = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
        cities[i] = v;
        order[i] = i;

        c.beginPath();
        c.arc(v.x, v.y, 1, 0, Math.PI * 2);
        c.strokeStyle = "rgb(50, 50, 50)";
        c.stroke();
    }
}

// for (var i = 0; i < 10; i++){
//     population[i] = 
// }

setup();