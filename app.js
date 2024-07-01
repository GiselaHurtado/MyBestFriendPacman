const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let ghostX, ghostY;
let cherryX, cherryY; 
let pacmanX = 5, pacmanY = 10;
let velocityX = 0, velocityY = 0;
let score = 0;
let ghostsEaten = 0;

let highScore = localStorage.getItem("high-score") ? parseInt(localStorage.getItem("high-score")) : 0;
if (highScore > 5000) {
  highScore = 5000;
  localStorage.setItem("high-score", highScore);
}
highScoreElement.innerHTML = `High score: ${highScore}`;

const changeGhostPosition = () => {
  ghostX = Math.floor(Math.random() * 30) + 1;
  ghostY = Math.floor(Math.random() * 30) + 1;
};

const placeCherry = () => {
  
  if (ghostsEaten >= 3 && score < 5000) {
    cherryX = Math.floor(Math.random() * 30) + 1;
    cherryY = Math.floor(Math.random() * 30) + 1;
  } else {
    cherryX = null;
    cherryY = null; 
  }
};

const handleGameOver = () => {
  alert("Game Over!!");
  location.reload();
};

const changeDirection = (e) => {
  if (gameOver) return; 

  
  velocityX = 0;
  velocityY = 0; // Reset velocity on each key press

  if (e.key === "ArrowUp") {
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
  }
};

const initGame = () => {
  if (gameOver || score >= 5000) {
    gameOver = true; 
    handleGameOver();
    return;
  }
  
  if (velocityX !== 0 || velocityY !== 0) {
    pacmanX += velocityX;
    pacmanY += velocityY;
  }

 
  if (pacmanX === ghostX && pacmanY === ghostY) {
    changeGhostPosition();
    score += 100; 
    ghostsEaten++; 

    placeCherry(); 
  }

  if (cherryX !== null && cherryY !== null && pacmanX === cherryX && pacmanY === cherryY) {
    score += 500; // Award 500 points for cherry
    cherryX = null;
    cherryY = null; // Reset cherry position after eating
  }


    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High score: ${highScore}`;
  

  const htmlMarkup = `
  <div class="ghost" style="grid-area: ${ghostY} / ${ghostX}"></div>
  ${cherryX !== null && cherryY !== null ? `<div class="cherry" style="grid-area: ${cherryY} / ${cherryX}"></div>` : ''}
  <div class="pacman" style="grid-area: ${pacmanY} / ${pacmanX}"></div>
  `;
  playBoard.innerHTML = htmlMarkup;
};


changeGhostPosition();
placeCherry(); 
document.addEventListener("keydown", changeDirection);
setIntervalId = setInterval(initGame, 200);
