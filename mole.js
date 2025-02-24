let currentMoleTile; 
let currPlaneTile;
let score = 0;
let gameOver = false;

let lastSpawned = null; // Track which one was last spawned

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid for the game board in HTML
    for(let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();

        tile.addEventListener("click", setTile);

        document.getElementById("board").appendChild(tile);
    }

    // Start the random spawn process
    randomSpawn();
}

function getRandomTile() {
    // To spawn the mole or plant at a random tile
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function randomSpawn() {
    if(gameOver) {
        return;
    }

    // Randomly decide whether to spawn a mole or a plant
    if (Math.random() > 0.5) {
        setMole();
    } else {
        setPlant();
    }

    // Randomize the spawn interval between 1 and 2 seconds
    let randomTime = Math.random() * 1000 + 1000; // Random between 1000ms and 2000ms
    setTimeout(randomSpawn, randomTime);
}

function setMole() {
    if(gameOver) {
        return;
    }

    // Remove plant if it exists
    if(currPlaneTile) {
        currPlaneTile.innerHTML = "";
    }

    // Remove mole if it exists
    if(currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./img/monty-mole.png";

    let num = getRandomTile();
    
    // Make sure the mole doesn't spawn on a tile with the plant
    if(currPlaneTile && currPlaneTile.id == num) {
        return;
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);

    lastSpawned = "mole"; // Track that mole was last spawned

    // Remove the mole after 1 second
    setTimeout(() => {
        if (currentMoleTile) {
            currentMoleTile.innerHTML = "";
        }
    }, 1000); // 1 second duration for the mole
}

function setPlant() {
    if(gameOver) {
        return;
    }

    // Remove mole if it exists
    if(currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    // Remove previous plant if present
    if(currPlaneTile) {
        currPlaneTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./img/piranha-plant.png";

    let num = getRandomTile();

    // Make sure the plant doesn't spawn on a tile with the mole
    if(currentMoleTile && currentMoleTile.id == num) {
        return;
    }

    currPlaneTile = document.getElementById(num);
    currPlaneTile.appendChild(plant);

    lastSpawned = "plant"; // Track that plant was last spawned

    // Remove the plant after 1 second
    setTimeout(() => {
        if (currPlaneTile) {
            currPlaneTile.innerHTML = "";
        }
    }, 1000); // 1 second duration for the plant
}

function setTile() {
    if(this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currPlaneTile) {
        document.getElementById("score").innerText = "Game Over: " + score.toString(); 
        gameOver = true;
    }
}
