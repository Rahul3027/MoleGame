let currentMoleTile; 
let currPlaneTile;
let score = 0;
let gameOver = false;

let play;


window.onload = function() {
    setGame();
}

function setGame() {
    // set up the grid for the game board in html
    for(let i = 0 ; i < 9 ; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();

      tile.addEventListener("click" ,setTile );

      document.getElementById("board").appendChild(tile);
    }
    
    setInterval(setMole , 1000);
    setInterval(setPlant,2000);
}

function getRandomTile() {
    // to spawn the mole
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if(gameOver){
        return;
    }

    if(currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./img/monty-mole.png";

    let num = getRandomTile();
    
    if(currPlaneTile && currPlaneTile.id == num) {
        return;
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {

    if(gameOver){
        return;
    }

    if(currPlaneTile) {
        currPlaneTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./img/piranha-plant.png";

    let num = getRandomTile();

    if(currentMoleTile && currentMoleTile.id == num) {
        return;
    }

    currPlaneTile = document.getElementById(num);
    currPlaneTile.appendChild(plant);
}

function setTile() {
    if(this == currentMoleTile) {
        score+=10;
        document.getElementById("score").innerText = score.toString();
    }
    else if ( this == currPlaneTile) {
       document.getElementById("score").innerText = "Game Over:" + score.toString(); 
       gameOver = true;
    }
}

