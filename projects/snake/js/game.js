let eleCanvas = document.querySelector('#canvas'),
    ctx = eleCanvas.getContext('2d'),
    eleCurrentScore = document.querySelector('#current-score .value'),
    score = 0,
    eleBestScore = document.querySelector('#best-score .value'),
    direction = '',
    eleLevel = document.querySelector('#level .value'),
    level = 1,
    eleChangeLevel = document.querySelector('#level .label');

const config = {
  cellSize: 24,
  foodSize: 24,
  step: 0,
  maxStep: 7,
};

const snake = {
  x: config.cellSize,
  y: config.cellSize,
  directionX: 0,
  directionY: 0,
  maxBodySize: 1,
};

const snakeSkins = [
  './img/snake/head.svg',
];

const snakeImages = [
  imgHead = new Image(),
];

for (let i=0; i<snakeImages.length; i++) {
  snakeImages[i].src = snakeSkins[i];
}

const food = {
  x: randomInt(0, canvas.width / config.cellSize) * config.cellSize,
  y: randomInt(0, canvas.height / config.cellSize) * config.cellSize,
};

const foodImages = [
  './img/food/apple.svg',
  './img/food/carrot.svg',
  './img/food/eggplant.svg',
  './img/food/banana.svg',
];

let foodImg = new Image();
foodImg.src = foodImages[0];

const bomb = {
  x: -config.cellSize,
  y: -config.cellSize,
};

const bombImg = new Image();
bombImg.src = './img/food/bomb.svg';

const audioSrc = [
  './audio/eat.mp3',
  './audio/turn.mp3',
  './audio/dead.mp3',
  './audio/hit.mp3',
];

const audioNames = [
  audioEat = new Audio(),
  audioTurn = new Audio(),
  audioDead = new Audio(),
  audioHit = new Audio(),
];

for (let i=0; i<audioNames.length; i++) {
  audioNames[i].src = audioSrc[i];
}


window.addEventListener('load', (e) => {
  if (window.innerWidth <= 650) {
    eleCanvas.width = 300;
    eleCanvas.height = 300;
    config.cellSize = 15;
    config.foodSize = 15;
  } else {
    eleCanvas.width = 600;
    eleCanvas.height = 480;
  }
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, eleCanvas.width, eleCanvas.height);
  eleCanvas.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjIuNSIgZmlsbD0iIzUxNDk0OSIvPgo8L3N2Zz4K")';
  restart();
});
  

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
