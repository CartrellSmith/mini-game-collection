console.log("Whack JS loaded");
/*  
  WHACK‑A‑MOLE GAME LOGIC
  ------------------------
  Teacher Requirements Covered:
  ✔ CSS grid of holes
  ✔ setInterval to pick random hole
  ✔ classList.add() to show target
  ✔ setTimeout() to hide target
  ✔ Click listener increments score
*/

// Select elements
const whackGrid = document.getElementById("whackGrid");
const whackScore = document.getElementById("whackScore");
const startWhackBtn = document.getElementById("startWhackBtn");

// Game state
let score = 0;
let gameInterval = null;
let moleVisible = false;

// Create a reusable mole element
function createMole() {
  const mole = document.createElement("div");

  // Tailwind mole styling
  mole.className =
    "mole absolute w-16 h-16 bg-yellow-400 rounded-full left-1/2 -translate-x-1/2 bottom-0 transition-all duration-200 opacity-0 translate-y-6";

  // Click event to score
  mole.addEventListener("click", () => {
    if (moleVisible) {
      score++;
      whackScore.textContent = score;
      hideMole(mole);
    }
  });

  return mole;
}

// Show mole with animation
function showMole(mole) {
  moleVisible = true;
  mole.classList.remove("opacity-0", "translate-y-6");
  mole.classList.add("opacity-100", "translate-y-0");
}

// Hide mole with animation
function hideMole(mole) {
  moleVisible = false;
  mole.classList.add("opacity-0", "translate-y-6");
  mole.classList.remove("opacity-100", "translate-y-0");
}

// Start the game
function startWhackGame() {
  score = 0;
  whackScore.textContent = score;

  // Clear any previous interval
  if (gameInterval) clearInterval(gameInterval);

  // Add a mole to each hole
  const holes = document.querySelectorAll(".hole");
  holes.forEach(hole => {
    hole.innerHTML = ""; // clear old moles
    hole.appendChild(createMole());
  });

  // Random mole pop-up every 700ms
  gameInterval = setInterval(() => {
    const holes = document.querySelectorAll(".hole");
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const mole = randomHole.querySelector(".mole");

    showMole(mole);

    // Hide after 600ms
    setTimeout(() => hideMole(mole), 600);

  }, 700);
}

// Start button listener
startWhackBtn.addEventListener("click", startWhackGame);
