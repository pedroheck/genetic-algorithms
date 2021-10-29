var tela ={width: innerWidth, height: innerHeight - 8}

const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;

const c = canvas.getContext('2d');

var cities = []; // An array of points (vectors (x, y)) that represent the cities
var numCities = 5; // Number of cities

var popSize = 100; // Number of individuals in each generation
var population = []; // A population consists of individuals with genes that say the order in which the cities should be visited
var fitness = [];

var bestDistance = Infinity;
var bestEver;
var worstDistance = 0;

function spawnCities(){
    for(var i = 0; i < numCities; i++){
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;

        var city = new Vector(x, y);
        cities.push(city);
    }

    drawCities();
}

function drawCities(){
    for(var i = 0; i < cities.length; i++){
        c.beginPath();
        c.arc(cities[i].x, cities[i].y, 3, 0, 2 * Math.PI);
        c.stroke();
    }
}

function generateInitialPop(){
    var order = Array.from({length: numCities}, (_, i) => i); // [0, 1, 2, 3, ... numCities]
    console.log(order)

    while(population.length < popSize){
        order = shuffle(order); // Shuffles randomly [3, 1, 4, 0...]
        population.push(order.slice()); // Each individual is now this random order
    }
}

function shuffle(array){ // Function that shuffles an array
    var m = array.length, t, i;

    while(m){ // While there are still elements to shuffle
        // Pick a remaining element
        i = Math.floor(Math.random() * m--); // "m--" is to automatically subtract 1 from m everytime we use it

        // Now swap the picket element with the current element
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function calculateTotalDistance(points, order){ // Calculates the sum of the distances between cities A and B, B and C, C and D ... in order = [A, B, C, ...]
    var totalDistance = 0;
    for(var i = 0; i < order.length - 1; i++){

        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = points[cityBIndex];

        var d = distanceFrom(cityA, cityB);
        totalDistance += d;
    }

    return totalDistance;
}

function distanceFrom(v1, v2){
    return Math.sqrt(Math.pow(v2.y - v1.y, 2) + Math.pow(v2.x - v1.x, 2));
}

function calculateFitness(){
    for(var i = 0; i < population.length; i++){
        var totalDistance = calculateTotalDistance(cities, population[i]);
        if(totalDistance < bestDistance){
            bestDistance = totalDistance;
            bestEver = population[i];
        }
        if(totalDistance > worstDistance){
            worstDistance = totalDistance;
        }
        fitness[i] = 1 / totalDistance;
    }

    normalizeFitness();
}

function normalizeFitness(){
    var sum = 0;
    for (var i = 0; i < fitness.length; i++){
        sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++){
        fitness[i] = fitness[i] / sum;
    }
}

function createNextGeneration(){

}


spawnCities();
generateInitialPop();
calculateFitness();