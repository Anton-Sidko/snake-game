'use strict';

const field = document.querySelector('.game-field');
const cells = [...field.querySelectorAll('.game-cell')];

const controlKey = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
let length = 1;
const limit = 50;
let prevMoves = [];

let headIndex = Math.trunc(Math.random() * (100 - 0 + 1) + 0);
let bodyIndexes = [];
let fruitIndex;

const addFruit = function () {
  fruitIndex = Math.trunc(Math.random() * (100 - 0 + 1) + 0);

  while (fruitIndex === headIndex || bodyIndexes.includes(fruitIndex)) {
    fruitIndex = Math.trunc(Math.random() * (100 - 0 + 1) + 0);
  }

  cells[fruitIndex].classList.add('fruit');
};

const colorizeSnake = function (headIndex, bodyIndexes) {
  cells.forEach((cell, i) => {
    cell.classList.remove('snake-head', 'snake-body');
    if (bodyIndexes && bodyIndexes.includes(i)) {
      cell.classList.add('snake-body');
    }
  });
  cells[headIndex].classList.add('snake-head');
};

const eatingFruit = function (headInd, prevInd) {
  cells[headInd].classList.remove('fruit');
  bodyIndexes.push(prevInd);

  length++;
  if (length === limit) {
    field.classList.add('game-win');
    window.removeEventListener('keydown', handleSnake);
  }

  addFruit();
};

const moveSnake = function (add, prevInd) {
  headIndex += add;

  if (bodyIndexes.includes(headIndex)) {
    field.classList.add('game-over');
    window.removeEventListener('keydown', handleSnake);
  }

  prevMoves.push(prevInd);
  if (prevMoves.length > limit) {
    prevMoves = prevMoves.slice(1);
  }

  bodyIndexes = prevMoves.slice(-length);
};

const handleSnake = function (e) {
  if (!controlKey.includes(e.key)) return;

  let prevInd = headIndex;

  switch (e.key) {
    case 'ArrowUp':
      moveSnake(-10, prevInd);
      break;
    case 'ArrowDown':
      moveSnake(10, prevInd);
      break;
    case 'ArrowRight':
      moveSnake(1, prevInd);
      break;
    case 'ArrowLeft':
      moveSnake(-1, prevInd);
      break;
    default:
      throw new Error('Wrong key code!');
  }

  if (headIndex < 0) headIndex += 100;
  if (headIndex > 99) headIndex -= 100;

  if (headIndex === fruitIndex) eatingFruit(headIndex, prevInd);

  colorizeSnake(headIndex, bodyIndexes);
};

// Initialization
const init = function () {
  colorizeSnake(headIndex, bodyIndexes);
  addFruit();
};

init();

window.addEventListener('keydown', handleSnake);
