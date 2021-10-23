var characters = 'ABCÇDEFGHIJKLMNOPQRSTUVWXYZabcçdefghijklmnopqrstuvwxyz0123456789 .,!?:()';

var population = [];
var fitness = [];
var popSize = 2000;
var phrase = 'How long will the algorithm take to finish?';

var running;

function generateInitialPop(){
    for(var i = 0; i < popSize; i++){ // Generates each individual
        
        var individual = '';
        
        for(var j = 0; j < phrase.length; j++){ // Generates each character in the individual
            individual += characters[Math.floor(Math.random() * characters.length)];
        }
        population.push(individual);
    }
}

function calculateFitness(){
    fitness = [];

    for(var i = 0; i < population.length; i++){ // Runs through each individual
        var individual = population[i];
        var indiv_fitness = 0;

        for(var j = 0; j < individual.length; j++){ // Runs through each letter
            if(individual[j] == phrase[j]){
                indiv_fitness++;
            }
        }

        indiv_fitness = indiv_fitness / phrase.length;
        fitness.push(indiv_fitness.toFixed(5));
    }
}


function createNextGeneration(){
    var matingPool = []; // [A1, A1, A1, B1, C1, C1, D1, D1, D1, D1, E1, E1, ...] => The bigger the fitness, the bigger the number of appearances
    var newPopulation = []; // [A1, C1, D1, ...]

    for(var i = 0; i < population.length; i++){ // Populates the matingPool according to their fitness
        var num = parseInt((fitness[i] * 100).toFixed(0)) + 1; // The + 1 is to give even the least fit a chance to be selected

        for(var j = 0; j < num; j++){
            matingPool.push(population[i]);
        }
    }

    for(var i = 0; i < population.length; i++){ // Creates the new population
        var indexA = Math.floor(Math.random() * matingPool.length);
        var indexB = Math.floor(Math.random() * matingPool.length);
        var child = onePointCrossover(matingPool[indexA], matingPool[indexB]);

        child = mutate(child);

        newPopulation.push(child);
    }

    population = newPopulation;

    calculateFitness();
}

function crossover(ind1, ind2){
    var child = '';
    for(var i = 0; i < ind1.length; i++){
        if(Math.random() < 0.5){
            child += ind1[i];
        } else {
            child += ind2[i];
        }
    }
    return child;
}

function onePointCrossover(ind1, ind2){
    var child = '';
    var indexPoint = Math.floor(Math.random() * ind1.length);

    if(Math.random() < 0.5){
        for(var i = 0; i < ind1.length; i++){
            if(i < indexPoint){
                child += ind1[i];
            } else {
                child += ind2[i];
            }
        }
    } else{
        for(var i = 0; i < ind1.length; i++){
            if(i < indexPoint){
                child += ind2[i];
            } else {
                child += ind1[i];
            }
        }
    }
    return child;
}

function mutate(individual){
    for(var i = 0; i < individual.length; i++){
        if(Math.random() < 0.02){ // Gives 2% chance to mutate
            individual = individual.replace(individual[i], characters[Math.floor(Math.random() * characters.length)]);
        }
    }
    return individual;
}

function getHighestFitness(){
    var highest = 0;
    for(var i = 0; i < fitness.length; i++){
        if(fitness[i] > highest){
            highest = fitness[i];
        }
    }
    return highest;
}

function getBestIndividual(){
    var bestIndex = 0;
    for(var i = 0; i < fitness.length; i++){
        if(fitness[i] > fitness[bestIndex]){
            bestIndex = i;
        }
    }
    return population[bestIndex];
}

function run(){
    running = true;

    generateInitialPop();
    calculateFitness();

    var highestFitness = getHighestFitness();
    var generation = 0;

    while(highestFitness < 1 && running == true){
        createNextGeneration();
        highestFitness = getHighestFitness();
        generation++;
        if(generation > 100000){
            break;
        }
        console.log("Generation: " + generation + " | Best of this generation: " + getBestIndividual() + " | Fitness: " + (highestFitness * 100).toFixed(2) + "%");
    }
}

function pause(){
    running = false;
}

// run();
