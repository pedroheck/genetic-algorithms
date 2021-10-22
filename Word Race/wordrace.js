var characters = 'ABCÇDEFGHIJKLMNOPQRSTUVWXYZabcçdefghijklmnopqrstuvwxyz';

var population = [];
var fitness = [];
var popSize = 200;
var word = 'paralelepipedo';

function generateInitialPop(){
    for(var i = 0; i < popSize; i++){ // Generates each individual
        
        var individual = '';
        
        for(var j = 0; j < word.length; j++){ // Generates each character in the individual
            individual += characters[Math.floor(Math.random() * characters.length)];
        }
        population.push(individual);
    }
}

function calculateFitness(){
    for(var i = 0; i < population.length; i++){ // Runs through each individual
        var individual = population[i];
        var indiv_fitness = 0;

        for(var j = 0; j < individual.length; j++){ // Runs through each letter
            if(individual[j] == word[j]){
                indiv_fitness++;
            }
        }

        indiv_fitness = indiv_fitness / word.length;
        fitness.push(indiv_fitness.toFixed(5));
    }
}



generateInitialPop();
calculateFitness();
