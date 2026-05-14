/* ============================
   SNAKE GAME — FULL ENGINE
   ============================ */

document.addEventListener("DOMContentLoaded", () => {

  // Sounds
  const moveSound = new Audio("Sounds/move.mp3");
  const eatSound = new Audio("Sounds/eat.mp3");
  const gameOverSound = new Audio("Sounds/game-over.mp3");

  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");

  const box = 20;
  let snake = [{ x: 200, y: 200 }];
  let direction = "RIGHT";
  let food = spawnFood();
  let score = 0;
  let gameInterval = null;
  let gameRunning = false;

  /* Spawn food at random grid location */
  function spawnFood() {
    return {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  }

  function drawGrid() {
    ctx.strokeStyle = "#1F2937";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += box) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += box) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function drawGame() {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#10B981" : "#34D399";
      ctx.fillRect(segment.x, segment.y, box, box);
    });

    ctx.fillStyle = "#EF4444";
    ctx.fillRect(food.x, food.y, box, box);

    moveSnake();
  }

  function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height
    ) {
      endSnakeGame();
      return;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        endSnakeGame();
        return;
      }
    }

    if (head.x === food.x && head.y === food.y) {
      score++;
      document.getElementById("snakeScore").textContent = score;

      eatSound.currentTime = 0;
      eatSound.play();

      food = spawnFood();
    } else {
      snake.pop();
    }

    snake.unshift(head);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") {
      direction = "LEFT";
      moveSound.currentTime = 0;
      moveSound.play();
    }
    if (e.key === "ArrowRight" && direction !== "LEFT") {
      direction = "RIGHT";
      moveSound.currentTime = 0;
      moveSound.play();
    }
    if (e.key === "ArrowUp" && direction !== "DOWN") {
      direction = "UP";
      moveSound.currentTime = 0;
      moveSound.play();
    }
    if (e.key === "ArrowDown" && direction !== "UP") {
      direction = "DOWN";
      moveSound.currentTime = 0;
      moveSound.play();
    }
  });

  function startSnakeGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = spawnFood();
    score = 0;
    document.getElementById("snakeScore").textContent = score;

    gameRunning = true;

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 120);
  }

  function endSnakeGame() {
    gameRunning = false;
    clearInterval(gameInterval);

    gameOverSound.currentTime = 0;
    gameOverSound.play();

    alert("Game Over! Score: " + score);
  }

  document.getElementById("endSnakeBtn")
    .addEventListener("click", () => {
      clearInterval(gameInterval);
      gameRunning = false;
    });

  document.getElementById("startSnakeBtn")
    .addEventListener("click", startSnakeGame);

  document.getElementById("restartSnakeBtn")
    .addEventListener("click", startSnakeGame);

});