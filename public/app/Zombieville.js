//This module contains the games core logic.
//It is built as a set of methods for a game object.

function ominousWarning(){
	alert('And so it begins...');
}

//this contains the functions and objects required to generate the data for agents
  //seperate module will define the canvas
const game = (function(){
  let gameObj = {};
  //let gameLength = 100;

  gameObj.generation = 0;
  gameObj.activeAgents = [];

  gameObj.startGame = function(duration, numHum, propZomb,x,y){
    console.log(numHum,propZomb);

    gameObj.gameLength = parseInt(duration);

  	//generation = 0;
  	//turn();

  	console.log('The game has started')
  	return gameObj.generateAgents(numHum, propZomb,x,y);
  	//gameState = true;
  }

  gameObj.generateAgents = function(numHum, propZomb,x,y){
    for (let i = 0; i < numHum; i++){
			const human = new Agents('Human',2,gameObj.traitSelector(),'Blue',initialLocation(x,y));
			gameObj.activeAgents.push(human);
		}
		for (let j = 0; j < (numHum*propZomb); j++){
			const zombie = new Agents('Zombie',1,gameObj.traitSelector(),'Red',initialLocation(x,y));
			gameObj.activeAgents.push(zombie);
		}
  }

  Agents = function(type,speed,trait,color,location,action,neighbors){
  	this.type = type;
  	this.speed = speed;
  	this.trait = trait;
  	this.color = color;
  	this.location = location;
  	this.action = action;
  	this.neighbors = surroundingsChecker;
  }

  gameObj.traitSelector = function(){
    const traitNum = getRandomInt(0,3);
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

  function initialLocation(x,y){
    let position = [];

    position.push(getRandomInt(1,parseInt(x)));
    position.push(getRandomInt(1,parseInt(y)));

    return position;
  }

  function surroundingsChecker(location){
    //location is an array of length 2 (x, y)
    let neighbors = [];


    return neighbors;
  }


  gameObj.action = function(){
    for (var neighbor in neighbors){
      if(this.type === 'Zombie' && neighbor.type === 'Human'){
        bite(neighbor);
      }
      else if(this.type === 'Zombie' && neighbor.type === 'Zombie'){
        agent.move();
      }
      else if(this.type === 'Human' && neighbor.type === 'Zombie'){
        fight(neighbor);
      }
      else if(this.type === 'Human' && neighbor.type === 'Human'){
        this.move();
      }
    }
    return neighbors;
  }

  function move(){
  	let stepX = getRandomInt(-1,this.speed);
  	let stepY = getRandomInt(-1,this.speed);

  	position[0] += stepX;
  	position[1] += stepY;

  	agent.location = position;
  	return agent.location;
  }

  function bite(agent){
  	gameObj.agent.type = 'Zombie';
  	gameObj.agent.color = 'red';

  	return agent;

  }

  function fight(agent){
  	var agentIndex = gameObj.activeAgents.indexOf(agent);
  	if (agentIndex > -1) {
      gameObj.activeAgents.splice(index, 1);
  	}
  	return activeAgents;
  }


  function build(){
  	let buildPoints = 0;

  }

  gameObj.turn = function(){
  	if (gameObj.generation === gameObj.gameLength){
  		return gameObj.endGame();
  	}
  	else{
  		//clearCanvas();
  		gameObj.activeAgents.forEach(agent => {
  			return agent.action;
  		});
  		gameObj.generation += 1;
  		return gameObj.activeAgents;
  	}
  }

  gameObj.endGame = function(){
  	console.log('GAME OVER');
  	gameObj.activeAgents.length = 0;
  	//clearCanvas();
  	return generation = 0;
  }

  const getRandomInt = function(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return gameObj;
}());


//may want to take a look at fabric.js
const canvasDrawer = (function(){
  const canvasObj = {};

  canvasObj.displayPopulation = function(){
    var canvas = document.getElementById("canv");
    var context = canvas.getContext("2d");

    return game.activeAgents.forEach(agent =>{
        context.fillStyle = agent.color;
        context.fillRect(agent.location[0],agent.location[1],5,5);
    });
  }

  canvasObj.clearCanvas = function(){
    var canvas = document.getElementById("canv");
    var context = canvas.getContext("2d");

    console.log(context, 'this is working?');
    return context.clearRect(0,0,canvas.width,canvas.height);
  }

  return canvasObj;
}());


function assert(expectedBehavior, descriptionOfCorrectBehavior) {
  if (!expectedBehavior) {
    console.log(descriptionOfCorrectBehavior);
  } else {
    console.log('test passed');
  }
}

console.log('game loaded')
