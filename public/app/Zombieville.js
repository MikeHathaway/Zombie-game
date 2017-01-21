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

	//can use this to make explosions and shit
	canvasObj.emergentEffects = function(effectType){

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
	gameObj.occupiedLocations = [];

  gameObj.startGame = function(duration, numHum, propZomb,x,y){
		console.log('The game has started')
    gameObj.gameLength = parseInt(duration);

		//specifies the real world timing of a turn
		window.setInterval(gameObj.turn,500)
  	return gameObj.generateAgents(numHum, propZomb,x,y);
  }

  gameObj.generateAgents = function(numHum, propZomb,x,y){
    for (let i = 0; i < numHum; i++){
			const human = new Agents('Human',2,gameObj.traitSelector(),'Green',initialLocation(x,y),getRandomInt(10,gameObj.gameLength));
			gameObj.activeAgents.push(human);
		}
		for (let j = 0; j < (numHum*propZomb); j++){
			const zombie = new Agents('Zombie',1,gameObj.traitSelector(),'Red',initialLocation(x,y),getRandomInt(2,gameObj.gameLength));
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

		//not sure if it is necessary to provide additional agent properties.
  		//this.action = gameObj.action;
  		//this.neighbors = occupiedLocations;
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
	//for some reason this doesnt seem to generate an array ...
	const identifyLocations = function(){
		//let occupiedCells = [];
		let occupiedPlaces = gameObj.occupiedLocations;

		return gameObj.activeAgents.forEach(agent =>{
			gameObj.occupiedLocations.push([agent.location,agent.type]);
		});

		//return occupiedCells;
	}

	//there is a problem with this function that is preventing actions from being taken by humans
  const determineAction = function(agent){
		let potentialNeighbors = gameObj.occupiedLocations;
		let agentActionTaken = false;
		//let agent.hasNeighbors = false;

		potentialNeighbors.map((location,index) =>{
			//location is structured as [[x,y],agent.type]
			if(agent.location[0] + 1 === location[0][0] && agent.location[1] + 1 === location[0][1] && location[1] === 'Zombie'){
				//The human discovered it has a zombie for a neighbor...
					//they now get the opportunity to fight or run away. If they fail, they are now another zombie!!!
					//success or failure is based upon a simple coin flip function
					//agent.hasNeighbors = true;

					//can reference neighbor by using gameObj.activeAgents[index]
					if(agent.type === 'Agressive'){
						agentActionTaken = true;
						return fight(agent,gameObj.activeAgents[index],index);
					}
					else if(agent.type === 'Sedentary'){
						if(coinFlip()){
							agentActionTaken = true;
							return run(agent);
						}
					}
					agentActionTaken = true;
					return run(agent);
			}
		})
		if(agentActionTaken = false){
			return move(agent)
		}
		//if(agent.hasNeighbors === false){
		//return move(agent);
		//}
  }

	//uses a coin flip to simulate success or failure with running away
	const run = function(agent){
		if(coinFlip()){
			console.log('run: this is working!')
			return move(agent)
		}
		agent.type === 'Zombie'
		agent.color === 'Blue'
		console.log('run: this is working! - why is no one blue?')
		return agent;
	}


	const fight = function(agent,zombie,index){
		canvasDrawer.emergentEffects(explosion);
		if(coinFlip()){
			console.log('Fight: this is working')
			return gameObj.activeAgents.splice(index,1);
		}
		agent.type === 'Zombie'
		agent.color === 'Blue'
		console.log('Fight: this is working')
		return agent;
	}



	//this is now very likely obsolete
	/*
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
	*/

  const move = function(agent){
  	let stepX = getRandomInt(-1,agent.speed);
  	let stepY = getRandomInt(-1,agent.speed);

  	agent.location[0] += stepX;
  	agent.location[1] += stepY;

  	return agent.location;
  }

	/*

  function build(){
  	let buildPoints = 0;

  }
	*/

	function checkEnergyLevel(agent,index){
		if(agent.energyLevel === 0){
			return gameObj.activeAgents.splice(index,1)
		}
	}

  gameObj.turn = function(){
		identifyLocations();
  	if (gameObj.generation === gameObj.gameLength){
  		return gameObj.endGame();
  	}
  	else{
  		gameObj.activeAgents.forEach((agent,index) => {
				//return agent.action
				agent.energyLevel--;
				checkEnergyLevel(agent,index);

				if(agent.type === 'Zombie'){
					move(agent)
				}
				else if(agent.type === 'Human'){
					determineAction(agent);
				}
				return agent;
  		});
  		gameObj.generation += 1;

      canvasDrawer.clearCanvas();
      canvasDrawer.displayPopulation();
  	}
  }

  gameObj.endGame = function(){
  	gameObj.activeAgents.length = 0;
    //canvasDrawer.clearCanvas;
		canvasDrawer.writeMessage('GAME OVER');
		console.log('GAME OVER');
  	return gameObj.generation = 0;
  }

  const getRandomInt = function(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

	//Randomly generates true or false values for use in other functions
	function coinFlip() {
		console.log('coinFlip(): working')
    return (Math.floor(Math.random() * 2) == 0);
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
