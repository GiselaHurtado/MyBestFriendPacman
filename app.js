const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let ghostX, ghostY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score: ${highScore}`;

const changeGhostPosition = () => {
  ghostX = Math.floor(Math.random() * 30) + 1;
  ghostY = Math.floor(Math.random() * 30) + 1;


}

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over!!");
  location.reload();
};

const changeDirection = (e) => {
  if(e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if(e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if(e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if(e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
  // initGame();

}

const initGame = () => {
  if(gameOver) return handleGameOver();
  

  if(snakeX === ghostX && snakeY === ghostY){
    changeGhostPosition();
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Score: ${score}`;

    highScoreElement.innerHTML = `High score: ${highScore}`;
  }

  let htmlMarkup = `<div class="ghost" style="grid-area: ${ghostY} / ${ghostX}"></div>`;

  snakeX += velocityX;
  snakeY += velocityY;

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
    gameOver =true;


  };

  htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  playBoard.innerHTML = htmlMarkup;
}

changeGhostPosition();
// initGame();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);