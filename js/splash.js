'use strict';

// Player form logic
var numberOfPlayers = 2;
var numberOfPlayersSpan = document.getElementById('number-of-players');
var incrementPlayerBtn = document.getElementById('increment-player-button');
var decrementPlayerBtn = document.getElementById('decrement-player-button');
var playerForm = document.getElementById('player-form');
var startButton = document.getElementById('start-button');

// these made me laugh! excellent work!
var defaultNames = [
  'PopNFresh',
  'ButterCup',
  'DeadSkunk',
  'LadyHaha',
  'Willip',
  'Flappy',
  'Snookums',
  'Chauncy'
];

incrementPlayerBtn.addEventListener('click', function() {
  if (numberOfPlayers < 4) {
    numberOfPlayers++;
  }
  // since this line is in both event listeners, it seems like it could be in playerInputHandler
  numberOfPlayersSpan.innerText = numberOfPlayers;
  playerInputHandler();
});

decrementPlayerBtn.addEventListener('click', function() {
  if (numberOfPlayers > 2) {
    numberOfPlayers--;
  }
  numberOfPlayersSpan.innerText = numberOfPlayers;
  playerInputHandler();
});

function playerInputHandler() {
  while (playerForm.firstChild) {
    playerForm.removeChild(playerForm.firstChild);
  }
  for (var i = 0; i < numberOfPlayers; i++) {
    var newPlayerInput = document.createElement('input');
    newPlayerInput.classList.add('newPlayerAppend');
    newPlayerInput.setAttribute('type', 'text');
    playerForm.appendChild(newPlayerInput);
  }
}

function submitUserNames() {
  var reg = /\s/;
  var isValid = true;
  var userNamesArray = [];
  var nameInputs = document.getElementsByTagName('input');
  for (var i = 0; i < nameInputs.length; i++) {
    var name = nameInputs[i].value;
    if (reg.test(name) || !name || name.length > 9) {
      var rando = Math.floor(Math.random() * defaultNames.length);
      // i'm so glad that this logic is modified to ensure that people can type in DeadSkunk
      // and your code will still ensure it's not duplicated
      while (userNamesArray.includes(defaultNames[rando])) {
        rando = Math.floor(Math.random() * defaultNames.length);
      }
      name = defaultNames[rando];
      nameInputs[i].value = name;
      userNamesArray.push(defaultNames[rando]);
      isValid = false;
    } else {
      if (userNamesArray.includes(name)) {
        name = `${name}${i + 1}`;
      }
      userNamesArray.push(name);
    }
  }
  if (isValid) {
    var stringifiedArray = JSON.stringify(userNamesArray);
    localStorage.setItem('playerArr', stringifiedArray);
    window.location = 'views/display.html';
  } else {
    // it would be nice if there were some feedback to the user about *why* the name was invalid.
    var validation = document.getElementById('validation');
    validation.textContent ='One or more of your names were invalid so here are some names we like!';
  }
}

startButton.addEventListener('click', function() {
  submitUserNames();
});


playerInputHandler();
// missing trailing newline