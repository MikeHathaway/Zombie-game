//ZOMBIE SIMULATION GAME or 'Mikes game of Zombies'

//Game of autnomous agents with user defined rules, and an overriding goal of living as long as possible.
	//Secondary goal of establishing order?
		//If so, how do you define order?
		//Could be interesting to randomly generate personality trai

	//Played at Society scale
		//Each pixel represents an autonomous agent

		//Actions will be taken by these agents as a reflection of their surroundings
			//More than one pixel out

	//This game is turn based

//this function is still incomplete
function startGame(duration, numHum, propZomb){
	return generateAgents(numHum, propZomb);
}


//Global Data Structure
var activeAgents = [];


//Prototype of objects
var Agents = function(type,speed,trait,color,action,neighbors){
	this.type = type;
	this.speed = speed;
	this.trait = trait;
	this.color = color;
	this.action = action;
	this.neighbors = surroundingsChecker;
}

//numGenerations an optional argument
	//propZomb is the proportion of Humans that start as zombies
	//none start as 'transformed'
function generateAgents(numHum, propZomb){
	for (var i = 0; i < numHum; i++){
		var human = new Agents('Human',2,traitSelector(),'Blue');
		activeAgents.push(human);
	}
	for (var i = 0; i < (numHum*propZomb); i++){
		var zombie = new Agents('Zombie',1,traitSelector(),'Red');
		activeAgents.push(zombie);
	}
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
	if (generation === startGame(duration)){
		return endGame();
	}
	else{
		generation += 1;
	}
	console.log(generation);
	return generation;
}

function turn(){
	timer();
	activeAgents.map(agent => {
		return agent.action;
	});
	return activeAgents;
}

function endGame(){console.log('GAME OVER');
	return generation = 0, activeAgents.length = 0;
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
			break;
		}
		else if(agent.type === 'Human' && neighbor.type === 'Zombie'){
			fight(neighbor);
		}
		else if(agent.type === 'Human' && neighbor.type === 'Human'){
			run();
		}
	}
	return neighbors;
}

//LIST OF ACTIONS
	//change from transforming into zombie after two turns elapse
function bite(agent){
	var turnsElapsed = 0;
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

//need to add conditional logic to this. Also, in which direction should the agent run?
	//can a one pixel run be followed by a fight? Ans, best to say no, most likely.
function run(){
	agent.walk();
}


//ARENA
	//create the pixelated playing field on which the autonomous agents interact
	//use map of the continental United States, with starting locations based on population centers

	//still need to incorporate <script> tags

	//Should also incorporate button tags with which to control the ingame action

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




//based upon tutorial that utilized processingJS - width and height are not native variables.
//That being said altering or utilizing window can be supah dangerous.
var Walker = function(){
	this.x = window.width;
	this.y = window.height;
}

//walking function for a 9 cell grid
Agents.walk = function(){
	var stepX = getRandomInt(-1,2);
	var stepY = getRandomInt(-1,2);
	this.x += stepX;
	this.Y += stepY;

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

assert(startGame(100, 1000, .1), 'Generate 1000 agents, 10% of which are zombies, and have them interact for 100 turns');

//Call on function to start the game
startGame(100, 1000, .1);
