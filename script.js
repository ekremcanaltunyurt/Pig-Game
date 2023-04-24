"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variables so important for game logic
  //Reset Scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init() // starting function


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Dynamic select
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};



// Rolling Dice Conditions

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Create Random Dice (1 - 6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; // To select the dice image based on the numbers generated from a dice roll

    // Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score

      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Dynamic select
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

// Hold Scores

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore or scores[0] = scores[0] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]; //Dynamic select

    //Finish the game

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      //Switching to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init); // init function called.
