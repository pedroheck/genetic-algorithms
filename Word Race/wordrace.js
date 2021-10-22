var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var population = [];
var popSize = 20;
var word = 'pipoca';

function generateInitialPop(){
    for(var i = 0; i < popSize; i++){ // Generates each individual
        
        var individual = '';
        
        for(var j = 0; j < word.length; j++){ // Generates each character in the individual
            individual += characters[Math.floor(Math.random() * characters.length)];
        }
        population.push(individual);
    }
}

generateInitialPop();

console.log(population);