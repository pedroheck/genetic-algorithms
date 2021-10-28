var screen ={width: innerWidth, height: innerHeight}

const canvas = document.querySelector("canvas");
canvas.width = screen.width;
canvas.height = screen.height;

const c = canvas.getContext('2d');

var population = [];
var fitness = [];
var popSize = 500;
var mutationRate = 0.01;
var mutationMag = 0.02;

function generateInitialPop(){
    for(var i = 0; i < popSize; i++){
        var degrees = Math.random() * 360; // Generates an angle (in degrees) between 0 and 360
        var radians = degrees * (Math.PI / 180); // Transform into radians to serve as input in the tangent function below 
        var m = Math.tan(radians);
        var b = canvas.height * (Math.random() * 2 - 1); // Limits the intercept for the user to see the line
        
        var individual = [m, b]; // An individual's gene consists of two values: m (the angular coefficient) and b (the intercept)

        population.push(individual);
    }
}

