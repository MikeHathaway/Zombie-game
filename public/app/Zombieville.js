//ZOMBIE SIMULATION GAME or 'Mikes game of Zombies'


//this function is still incomplete
	//x,y represent the canvas width and height to be inputted into random int function
function startGame(duration, numHum, propZomb,x,y){

	gameLength = duration;
	let generation = 0;
	timer(generation);

	console.log('The game has started')

	return generateAgents(numHum, propZomb);
	//gameState = true;

}

//Initatlize user inputs - buttons for starting game, fields for entering conditions


//Global Data Structure
	//alternative means of structuring data. Create a seperate object for each state, with its own set of active agents
	//states could change colors and have in html seperators
	//may need to create a population object

const usPopulation = function(){
	const statePopulations = [
		{state: "California", population: statePopulation(), activeAgents: []},{}
	]
}


var activeAgents = [];
let gameLength = 100;

//Prototype of objects
var Agents = function(type,speed,trait,color,location,action,neighbors){
	this.type = type;
	this.speed = speed;
	this.trait = trait;
	this.color = color;
	this.location = location;
	this.action = action;
	this.neighbors = surroundingsChecker;
}

//numGenerations an optional argument
	//propZomb is the proportion of Humans that start as zombies
	//none start as 'transformed'
function generateAgents(numHum, propZomb,x,y){
	//if(gameState){
		for (var i = 0; i < numHum; i++){
			const human = new Agents('Human',2,traitSelector(),'Blue',initialLocation(x,y));
			activeAgents.push(human);
		}
		for (var i = 0; i < (numHum*propZomb); i++){
			const zombie = new Agents('Zombie',1,traitSelector(),'Red',initialLocation(x,y));
			activeAgents.push(zombie);
		}
	//}
}

function traitSelector(){
	var traitNum = getRandomInt(0,3);
	var trait;

	if(traitNum === 0){
		trait = 'Measured'
	}
	if(traitNum === 1){
		trait = 'Sedentary'
	}
	if(traitNum === 2){
		trait = 'Agressive'
	}

	return trait;
}


function timer(generation){
	if (generation === gameLength){
		return endGame();
	}
	else{
		generation += 1;
	}
	console.log(gameLength, generation);
	return generation;
}

function turn(){
	timer();
	activeAgents.map(agent => {
		return agent.action;
	});
	return activeAgents;
}

function endGame(){
	console.log('GAME OVER');
	activeAgents.length = 0;
	return generation = 0;
}


//this function is tied up into the canvas construction and recognition
	//
function surroundingsChecker(agentPosition){
	var neighbors = [];

	//for
		//if



	return neighbors;
}


	//Call to action at the beginning of every turn
		//this would be the main function, which in turn calls upon other potential behaviours;

//action determined by positioning - random yet deterministic
	//need to figure out a way to define neighbors
function action(){
	for (var neighbor in neighbors){
		if(agent.type === 'Zombie' && neighbor.type === 'Human'){
			bite(neighbor);
		}
		else if(agent.type === 'Zombie' && neighbor.type === 'Zombie'){
			move();
		}
		else if(agent.type === 'Human' && neighbor.type === 'Zombie'){
			fight(neighbor);
		}
		else if(agent.type === 'Human' && neighbor.type === 'Human'){
			move();
		}
	}
	timer();
	return neighbors;
}

//LIST OF ACTIONS
	//change from transforming into zombie after two turns elapse
function bite(agent){
	let turnsElapsed = 0;
	while (turnsElapsed < 2){
		if(agent === 'Human'){
			agent.type = 'Transforming';
			agent.speed = 0;
			agent.color = 'Orange'
		}
		else{
			return agent;
		}
		turnsElapsed += 1
	}
	return agent;
}


function fight(agent){
	var agentIndex = activeAgents.indexOf(agent);
	if (agentIndex > -1) {
    activeAgents.splice(index, 1);
	}
	return activeAgents;
}




//ARENA
	//create the pixelated playing field on which the autonomous agents interact
	//use map of the continental United States, with starting locations based on population centers

function sizeGrid(inputWidth, inputHeight){
	var center = (inputWidth/2, inputHeight/2);

}

function drawGrid(canvas){
	var c = document.getElementById("myCanvas");
	//2d may not be the ideal canvas format - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(20, 20, 150, 100);
}
/*
<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>*/


function initialConditions(USPopulationDistributions){

}

//need to add conditional logic to this. Also, in which direction should the agent run?
	//can a one pixel run be followed by a fight? Ans, best to say no, most likely.

	//need to check
function initialLocation(x,y){
	let startingPos = [];

	startingPos.push(getRandomInt(1,x));
	startingPos.push(getRandomInt(1,y));

	return startingPos;
}

function location(x,y){

}

//walking function for a 9 cell grid
Agents.move = function(){
	let stepX = getRandomInt(-1,2);
	let stepY = getRandomInt(-1,2);

	return location((this.x + stepX),(this.y + stepY));

}

//Courtesy of MDN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


//Program tests
function assert(expectedBehavior, descriptionOfCorrectBehavior) {
  if (!expectedBehavior) {
    console.log(descriptionOfCorrectBehavior);
  } else {
    console.log('test passed');
  }
}

console.log('game loaded')

//basic test suite
//assert(startGame(100, 1000, .1), 'Generate 1000 agents, 10% of which are zombies, and have them interact for 100 turns');

//Call on function to start the game
//potential default starting conditions
//startGame(100, 1000, .1);
