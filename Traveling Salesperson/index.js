// var tela ={width: innerWidth, height: innerHeight - 8}

const canvas = document.querySelector("canvas");
// canvas.width = tela.width * 0.7;
// canvas.height = tela.height;

const c = canvas.getContext('2d');

var cities = []; // An array of points (vectors (x, y)) that represent the cities
var numCities = 100; // Number of cities

var popSize = 1200; // Number of individuals in each generation
var population = []; // A population consists of individuals with genes that say the order in which the cities should be visited
var fitness = [];

var bestDistance = Infinity;
var bestEver;
var currentBest;
var worstDistance = 0;

var mutationRate = 0.02;

var isPaused = false;

function spawnCities(){
    for(var i = 0; i < numCities; i++){
        var x = Math.random() * (canvas.width - 100) + 50;
        var y = Math.random() * (canvas.height - 70) + 35;

        var city = new Vector(x, y);
        cities.push(city);
    }

    drawCities();
}

function drawCities(){
    for(var i = 0; i < cities.length; i++){
        c.beginPath();
        c.strokeStyle = "black";
        c.arc(cities[i].x, cities[i].y, 3, 0, 2 * Math.PI);
        c.stroke();
    }
}

function generateInitialPop(){
    var order = Array.from({length: numCities}, (_, i) => i); // [0, 1, 2, 3, ... numCities]

    while(population.length < popSize){
        order = shuffle(order); // Shuffles randomly [3, 1, 4, 0...]
        population.push(new Individual(order.slice())); // Each individual is now this random order
    }

    calculateFitness();
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
    var cityAIndex;
    var cityA;
    var cityBIndex;
    var cityB;

    for(var i = 0; i < order.length - 1; i++){

        cityAIndex = order[i];
        cityA = points[cityAIndex];
        cityBIndex = order[i + 1];
        cityB = points[cityBIndex];

        var d = distanceFrom(cityA, cityB);
        totalDistance += d;
    }

     // The last city should be the same as the first one, for the Travelling Salesman problem requires a cyclical path
    var lastCityIndex = order[order.length - 1]
    var lastCity = points[lastCityIndex];
    var firstCityIndex = order[0];
    var firstCity = points[firstCityIndex];

    totalDistance += distanceFrom(lastCity, firstCity);

    return totalDistance;
}

function distanceFrom(v1, v2){
    return Math.sqrt(Math.pow(v2.y - v1.y, 2) + Math.pow(v2.x - v1.x, 2));
}

function calculateFitness(){
    var currentRecord = Infinity;
    for(var i = 0; i < population.length; i++){
        var totalDistance = calculateTotalDistance(cities, population[i].order);

        if(totalDistance < bestDistance){
            bestDistance = totalDistance;
            bestEver = population[i];
        }
        if(totalDistance < currentRecord){
            currentRecord = totalDistance;
            currentBest = population[i];
        }

        if(totalDistance > worstDistance){
            worstDistance = totalDistance;
        }

        fitness[i] = 1 / totalDistance;
        population[i].fitness = fitness[i];
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
        population[i].fitness = fitness[i];
    }    
}

function getBestIndividual(){
    var bestFitness = 0;
    var bestFitnessIndex;
    for(var i = 0; i < fitness.length; i++){
        if(fitness[i] > bestFitness){
            bestFitness = fitness[i];
            bestFitnessIndex = i;
        }
    }

    return population[bestFitnessIndex];
}

function nextGeneration() {
    var newPopulation = [];
    for (var i = 0; i < population.length; i++) {
        var orderA = tournamentSelection();
        var orderB = tournamentSelection();
        // var orderA = pickOne(population, fitness);
        // var orderB = pickOne(population, fitness);
        var order = crossOver(orderA, orderB);
        mutate(order);
        newPopulation[i] = new Individual(order);
    }
    population = newPopulation;
    calculateFitness();
}

function pickOne(list, prob) {
    var index = 0;
    var r = Math.random(); // Random number between 0 and 1

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return new Individual(list[index].order.slice());
}

function tournamentSelection(){
    var tournamentSize = 8;
    var bestIndex = 0;
    for(var i = 0; i < tournamentSize; i++){
        var randomIndex = Math.floor(Math.random() * population.length);
        // bestIndex = population[randomIndex].fitness > population[bestIndex].fitness ? randomIndex : bestIndex;
        if(fitness[randomIndex] > fitness[bestIndex]){
            bestIndex = randomIndex;
        }
    }
    // console.log(bestIndex);
    return new Individual(population[bestIndex].order.slice());
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function mutate(order) {
    for (var i = 0; i < numCities; i++) {
        if (Math.random() < mutationRate) {
            var indexA = Math.floor(Math.random() * order.length);
            var indexB = (indexA + 1) % numCities;
            swap(order, indexA, indexB);
        }
    }
}


function crossOver(parentA, parentB) {
    var start = Math.floor(Math.random() * parentA.order.length);
    // console.log("start: ", start);
    var end = Math.floor(Math.random() * start + parentA.order.length);
    // console.log("end: ", end);
    var neworder = parentA.order.slice(start, end);
    // console.log("new order: ", neworder);
    // var left = totalCities - neworder.length;
    for (var i = 0; i < parentB.order.length; i++) {
      var city = parentB.order[i];
      if (!neworder.includes(city)) { // only adds city if it is not already in the new order
        neworder.push(city);
      }
    }
    return neworder;
}

function drawBest(){
    c.clearRect(0, 0, canvas.width, canvas.height);

    var best = getBestIndividual();
    var order = best.order;

    c.beginPath();
    c.strokeStyle = "red";
    c.lineWidth = 1;
    c.moveTo(cities[order[0]].x, cities[order[0]].y);
    for (var i = 1; i < order.length; i++) {
        c.lineTo(cities[order[i]].x, cities[order[i]].y);
    }
    c.lineTo(cities[order[0]].x, cities[order[0]].y); // Draws the last line back to the first city
    c.stroke();
}

function drawBestEver(){
    // c.clearRect(0, 0, canvas.width, canvas.height);

    var order = bestEver.order;

    c.beginPath();
    c.strokeStyle = "blue";
    c.lineWidth = 3;
    c.moveTo(cities[order[0]].x, cities[order[0]].y);
    for (var i = 1; i < order.length; i++) {
        c.lineTo(cities[order[i]].x, cities[order[i]].y);
    }
    c.lineTo(cities[order[0]].x, cities[order[0]].y); // Draws the last line back to the first city
    c.stroke();
}

function animate(){
    if(!isPaused){
        requestAnimationFrame(animate);
    }
    nextGeneration();
    drawBest();
    drawBestEver();
    drawCities();
    updateInfo();
}

function pause(){
    isPaused = !isPaused;
}

function updateInfo(){
    document.getElementById("best").textContent = "Best Distance yet: " + bestDistance.toFixed(1);
}

spawnCities();
generateInitialPop();
animate();
