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
var totalCities = 5;

var order = [];

var population = [];
var popSize = 100;
var fitness = [];

var recordDistance = Infinity;
var bestEver;

var statusP;

function setup(){
    
    var order = [];
    for(var i = 0; i < totalCities; i++){
        var v = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
        cities[i] = v;
        order[i] = i; // Creates an array that's just [0, 1, 2, 3, 4...]

        c.beginPath();
        c.arc(v.x, v.y, 3, 0, Math.PI * 2);
        c.strokeStyle = "rgb(50, 50, 50)";
        c.stroke();
    }

    for (var i = 0; i < popSize; i++){
        population[i] = order.slice();
        shuffle(population[i], 100);
    }

    
}

function swap(a, i, j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function shuffle(a, num){
    for(var i = 0; i < num; i++){
        var indexA = Math.floor(Math.random() * a.length);
        var indexB = Math.floor(Math.random() * a.length);
        swap(a, indexA, indexB);
    }
}

// Calculates total distance between points given their order
function calcDistance(points, order){
    var sum = 0;

    for(var i = 0; i < order.length - 1; i++){
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = points[cityBIndex];
        var d = cityA.dist(cityB);
        sum += d;
    }
    return sum;
}

function draw(){
    calculateFitness();
    normalizeFitness();
    nextGeneration();
}

// function treatRGB(color){
//     let cores = color.substring(4, color.length - 1) // remover os caracteres de texto. ex: "rgb(256,20,40)"
//             .split(',') // retornar um array com os elementos separados por virgula. ex: '256','20','40'
            
//     return cores;
// }


setup();
draw();
