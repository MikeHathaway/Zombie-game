//This module contains the games core logic.
//It is built as a set of methods for a game object.
	//It is seperated into two main modules. The first, canvasDrawer,
	// adds a set of methods with which to manipulate the HTML5 Canvas, as well as the UI.

	//The second, game, encapsulates the core game logic that enables this simulation.

function ominousWarning(){
	alert('And so it begins...');
}

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

    return context.clearRect(0,0,canvas.width,canvas.height);
  }

	canvasObj.writeMessage = function(message){
		var canvas = document.getElementById("canv");
    var context = canvas.getContext("2d");

		context.font = "150px Nosifer"
		context.fillStyle = "red"
		return context.fillText(message,(300), (canvas.height / 2));
	}

  return canvasObj;
}());

//this contains the functions and objects required to generate the data for agents
  //seperate module will define the canvas
const game = (function(){
  const gameObj = {};

	//initialize key module scope variables
  gameObj.generation = 0;
  gameObj.activeAgents = [];

  gameObj.startGame = function(duration, numHum, propZomb,x,y){

    gameObj.gameLength = parseInt(duration);

		window.setInterval(gameObj.turn,500)
  	console.log('The game has started')
  	return gameObj.generateAgents(numHum, propZomb,x,y);
  }

	//need to add energy level to the agent generation constructor
  gameObj.generateAgents = function(numHum, propZomb,x,y){
    for (let i = 0; i < numHum; i++){
			const human = new Agents('Human',2,gameObj.traitSelector(),'Blue',initialLocation(x,y),getRandomInt(10,50));
			gameObj.activeAgents.push(human);
		}
		for (let j = 0; j < (numHum*propZomb); j++){
			const zombie = new Agents('Zombie',1,gameObj.traitSelector(),'Red',initialLocation(x,y),getRandomInt(2,40));
			gameObj.activeAgents.push(zombie);
		}
  }

  Agents = function(type,speed,trait,color,location,energyLevel,action,neighbors){
  	this.type = type;
  	this.speed = speed;
  	this.trait = trait;
  	this.color = color;
  	this.location = location;
		this.energyLevel = energyLevel;
		//not sure if this is the right way to make this association
  	this.action = gameObj.action;
  	this.neighbors = surroundingsChecker;
		//add in unit of energy that can increase or decrease based upon actions, automatically decreases each turn
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

	//this may turn into a computational explosion in memory usage
		//apparent common alternative solution is to check if a cell value !== 0
  function surroundingsChecker(agent,location){
    //location is an array of length 2 (x, y)
    //let agent.neighbors = [];

		let occupiedLocations = [];

		/*
		gameObj.activeAgents.forEach(agent = >{
			occupiedLocations.push(agent.location);
		});

		gameObj.activeAgents.forEach(agent = >{
			if(occupiedLocations.indexOf(agent.location[0] + 1) !=== -1 || occupiedLocations.indexOf(agent.location[1] + 1) !=== -1)
		});

		*/
    return neighbors;
  }

//alternative means of checking for neighbors, see surrounding cell values
	function cellState(){
		let cellValue = 0;
		let occupiedLocations = [];

		gameObj.activeAgents.forEach(agent =>{
			occupiedLocations.push(agent.location);
		});

		return cellValue;
	}


  gameObj.action = function(){
    for (var neighbor in neighbors){
      if(this.type === 'Zombie' && neighbor.type === 'Human'){
        bite(neighbor);
      }
      else if(this.type === 'Zombie' && neighbor.type === 'Zombie'){
        this.move();
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

  const move = function(agent){
  	let stepX = getRandomInt(-1,agent.speed);
  	let stepY = getRandomInt(-1,agent.speed);

  	agent.location[0] += stepX;
  	agent.location[1] += stepY;

  	return agent.location;
  }

  function bite(agent){
  	agent.type = 'Zombie';
  	agent.color = 'red';

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

	function checkEnergyLevel(agent,index){
		if(agent.energyLevel === 0){
			return gameObj.activeAgents.splice(index,1)
		}
	}

  gameObj.turn = function(){
  	if (gameObj.generation === gameObj.gameLength){
  		return gameObj.endGame();
  	}
  	else{
  		gameObj.activeAgents.forEach((agent,index) => {
				//return agent.action
				agent.energyLevel--;
				checkEnergyLevel(agent,index);
  			move(agent);

				return agent;
  		});
  		gameObj.generation += 1;

      canvasDrawer.clearCanvas();
      canvasDrawer.displayPopulation();

  		//return gameObj.activeAgents;
  	}
  }

  gameObj.endGame = function(){
  	gameObj.activeAgents.length = 0;
    //canvasDrawer.clearCanvas;
		canvasDrawer.writeMessage('GAME OVER');
  	return gameObj.generation = 0;
  }

  const getRandomInt = function(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return gameObj;
}());





function assert(expectedBehavior, descriptionOfCorrectBehavior) {
  if (!expectedBehavior) {
    console.log(descriptionOfCorrectBehavior);
  } else {
    console.log('test passed');
  }
}

console.log('game loaded')
