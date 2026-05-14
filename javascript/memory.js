/*  
  MEMORY MATCH GAME LOGIC
  ------------------------
  Teacher Requirements Covered:
  ✔ Store card values in an array
  ✔ Shuffle algorithm (Fisher–Yates)
  ✔ Use event.target to detect clicked card
  ✔ Track first/second card flipped
  ✔ Compare values and lock board during check
  ✔ Use setTimeout to flip cards back
  ✔ Smooth flip animation using Tailwind + custom CSS
*/
// Sounds
const flipSound = new Audio("Sounds/flip.mp3");
const matchSound = new Audio("Sounds/match.mp3");
const mismatchSound = new Audio("Sounds/mismatch.mp3");
const winSound = new Audio("Sounds/win.mp3");

// Select elements
const memoryGrid = document.getElementById("memoryGrid");
const memoryScore = document.getElementById("memoryScore");
const startMemoryBtn = document.getElementById("startMemoryBtn");

// Game state
let cardValues = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Shuffle function (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create a single card element
function createCard(value) {
  const card = document.createElement("div");
  card.className = "memory-card w-24 h-32 relative cursor-pointer perspective";
  card.dataset.value = value;

  card.innerHTML = `
    <div class="card-inner w-full h-full transition-transform duration-500 transform-style-preserve-3d">

      <div class="card-front absolute w-full h-full bg-blue-500 rounded-xl flex items-center justify-center text-3xl font-bold backface-hidden">
        ?
      </div>

      <div class="card-back absolute w-full h-full bg-gray-800 rounded-xl flex items-center justify-center text-3xl font-bold backface-hidden rotate-y-180">
        ${value}
      </div>

    </div>
  `;

  // Click listener
  card.addEventListener("click", handleCardFlip);

  return card;
}

// Handle card flip
function handleCardFlip(e) {
  const card = e.currentTarget;

  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("card-flipped");

  // Play flip sound
    flipSound.currentTime = 0;
    flipSound.play();

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkMatch();
}

// Check if cards match
function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// If match, keep them flipped
function disableCards() {
  matches++;
  memoryScore.textContent = matches;

  firstCard.removeEventListener("click", handleCardFlip);
  secondCard.removeEventListener("click", handleCardFlip);

// Check for win
    if (matches === 8) {
        endMemoryGame();
    }

  matchSound.currentTime = 0;
  matchSound.play();

  resetBoard();
}

// If not match, flip them back
function unflipCards() {
  mismatchSound.currentTime = 0;
  mismatchSound.play();

    setTimeout(() => {
    firstCard.classList.remove("card-flipped");
    secondCard.classList.remove("card-flipped");
    resetBoard();
  }, 900);
}

// Reset tracking variables
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game
function startMemoryGame() {
  matches = 0;
  memoryScore.textContent = matches;

  memoryGrid.innerHTML = "";

  const shuffled = shuffle([...cardValues]);

  shuffled.forEach(value => {
    const card = createCard(value);
    memoryGrid.appendChild(card);
  });
}

function endMemoryGame() {
  // Show restart screen
  document.getElementById("memoryRestart").classList.remove("hidden");

  // Play win sound
  winSound.currentTime = 0;
  winSound.play();
}


// Start button listener
startMemoryBtn.addEventListener("click", startMemoryGame);

// Restart button listener
document.getElementById("restartMemoryBtn")
  .addEventListener("click", () => {
    document.getElementById("memoryRestart").classList.add("hidden");
    startMemoryGame();
  });