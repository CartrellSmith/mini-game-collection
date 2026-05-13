/*  
  CONTROLLER.JS
  -------------
  Handles switching between games on the single‑page Game Table.
  Shows the selected game and hides the others.
*/

// Select all game sections
const gameSections = document.querySelectorAll(".game");

// Select all menu buttons
const menuButtons = document.querySelectorAll(".game-btn");

// Function to show a specific game
function showGame(gameId) {
  // Hide all games
  gameSections.forEach(section => section.classList.add("hidden"));

  // Show the selected game
  const selectedGame = document.getElementById(gameId);
  if (selectedGame) {
    selectedGame.classList.remove("hidden");
  }
}

// Add click listeners to menu buttons
menuButtons.forEach(button => {
  button.addEventListener("click", () => {
    const gameId = button.getAttribute("data-game");
    showGame(gameId);
  });
});
