//initialize constant value
const boxs = document.querySelectorAll('.box');
const statusHints = document.getElementById('status');
const restartOfButton = document.getElementById('restartBtn');
const returnPage = document.getElementById('returnBtn');

let boxes = Array(9).fill('');
let currentPlayer = 'X';
let activateGame = true;
const TIE = 'TIE';

const changePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus();
};

const setStatus = () => {
  statusHints.innerText = `Next Player: ${currentPlayer}`;
};

const updateBoxes = (index) => {
  boxes[index] = currentPlayer;
};

//create the condition of wining in Tic Tac Toe game
const calculateWinningTime = (boxes) => {
  const winningCriteria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [x, y, z] of winningCriteria) {
    if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
      return boxes[x];
    }
  }
  if (!boxes.includes('')) {
    return TIE;
  }
  return null;
};

const showWinner = (winner) => {
  if (winner === TIE) {
    statusHints.innerText = TIE;
  } else {
    statusHints.innerText = `Winner is: ${winner}`;
  }
};

// Combine and call all functions
const makeAction = (box, index) => {
  if (activateGame) {
    if (boxes[index] !== '' || !activateGame) {
      return; // Prevent action on an already filled box or if the game is over
    }

    box.innerText = currentPlayer;
    box.classList.add(`player${currentPlayer}`);
    updateBoxes(index);

    const winner = calculateWinningTime(boxes);

    if (winner) {
      activateGame = false;
      showWinner(winner);
    } else {
      changePlayer();
    }
  }
};

boxs.forEach((box, index) => {
  box.addEventListener('click', () => makeAction(box, index));
});

setStatus();

const fadeOut = (elements) => {
  return new Promise((resolve) => {
    let op = 1; // initial opacity
    const timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        elements.forEach((element) => {
          element.style.visibility = 'hidden'; // Hide without removing from the layout
        });
        resolve(); // Resolve the promise when fading out is complete
      }
      elements.forEach((element) => {
        element.style.opacity = op;
      });
      op -= op * 0.1;
    }, 50);
  });
};

const fadeIn = (elements) => {
  return new Promise((resolve) => {
    elements.forEach((element) => {
      element.style.visibility = 'visible'; // Make visible without affecting layout
      element.style.opacity = '0.1'; // Start opacity
    });
    let opacity = 0.1;

    const timer = setInterval(function () {
      if (opacity >= 1) {
        clearInterval(timer);
        resolve(); // Resolve the promise when fading in is complete
      }
      elements.forEach((element) => {
        element.style.opacity = opacity;
      });
      opacity += opacity * 0.1;
    }, 50);
  });
};

const restartGame = async () => {
  activateGame = false;

  // Fade out all boxes simultaneously before resetting
  await fadeOut(boxs);

  boxs.forEach((box) => {
    box.innerText = '';
    box.classList.remove('playerX', 'playerO');
  });

  // Reset the game state
  boxes = Array(9).fill('');
  activateGame = true;

  if (currentPlayer === 'O') {
    changePlayer();
  } else {
    setStatus();
  }

  // Fade in all boxes simultaneously after resetting
  await fadeIn(boxs);
};
restartBtn.addEventListener('click', restartGame);

const returnPreviousPage = () => {
  window.location.href = '../../index.html';
};
returnPage.addEventListener('click', returnPreviousPage);
