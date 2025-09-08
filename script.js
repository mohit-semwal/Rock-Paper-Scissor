
const playBtn = document.getElementById("link");
const playGameDiv = document.getElementById("playGame");
const containerDiv = document.querySelector(".container");
const battleScreen = document.getElementById("battle-screen");

const weaponDiv = document.querySelector(".weapons-div");
const scoreBoard = document.querySelector(".score");
const weaponCardImg = document.querySelectorAll(".wepons-card img")

const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");

const wonCounting = document.getElementById("won")
const lostConting = document.getElementById("lost")
const drawCounting = document.getElementById("draw")

const resultAnauncement = document.querySelector("#resultAnauncement");
const quitBtn = document.querySelector("#quitBtn");
const playAgain = document.querySelector("#playAgain");
let won = 0, lost = 0, draw = 0;

// Start Game
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  playGameDiv.style.display = "none";
  containerDiv.style.display = "block";
});

// Computer Random Choice
function getComputerChoice() {
  let choice = ["Rock", "Paper", "Scissor"];
  return choice[Math.floor(Math.random() * choice.length)]
}

// check winner 
function checkWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    resultAnauncement.textContent = "🤝 It's a Draw!";
    resultAnauncement.style.color = "orange";
    return "draw"
  }

  if (
    (playerChoice === "Rock" && computerChoice === "Scissor") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissor" && computerChoice === "Paper")
  ) {
    resultAnauncement.textContent = "🎉 You Won!";
    resultAnauncement.style.color = "green";
    return "win";
  } else {
    resultAnauncement.textContent = "😢 You Lost!";
    resultAnauncement.style.color = "red";
    return "lose";
  }
}


// click on weapon 
weaponCardImg.forEach((img) => {
  img.addEventListener("click", () => {
    let playerChoice = img.dataset.choice
    let computerChoice = getComputerChoice();

    // show battle screen
    weaponDiv.style.display = "none"
    scoreBoard.style.display = "none"
    quitBtn.style.display = "none"
    battleScreen.style.display = "block"

    // reset images to fist (before result is shown)
    playerHand.src = `images/Rock.png`;
    computerHand.src = `images/Rock.png`;

    // add shake animation
    playerHand.classList.add("shake-player")
    computerHand.classList.add("shake-computer")

    setTimeout(() => {
      // remove animation classes
      playerHand.classList.remove("shake-player")
      computerHand.classList.remove("shake-computer")

      // update hands
      playerHand.src = `images/${playerChoice}.png`;
      computerHand.src = `images/${computerChoice}.png`;
      let result = checkWinner(playerChoice, computerChoice);

      if (result === "win") {
      won++;
    } else if (result === "lose") {
      lost++
    } else {
      draw++;
    }
    updateScore();
    }, 1000);

    playAgain.addEventListener("click",()=>{
      // show weapon screen
    weaponDiv.style.display = "block"
    scoreBoard.style.display = "flex"
    quitBtn.style.display = "block"
    battleScreen.style.display = "none"

     // reset announcement text
  resultAnauncement.textContent = "";
    })
    

  })
})

// updating score
function updateScore(){
wonCounting.textContent=won
lostConting.textContent=lost
drawCounting.textContent=draw
}


// Quit Game
quitBtn.addEventListener("click", () => {
  containerDiv.style.display = "none";
  playGameDiv.style.display = "block";

  // Reset
  won = lost = draw = 0;
  updateScore();
  battleScreen.style.display = "none";
});
