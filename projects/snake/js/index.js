const eleInfoPanel = document.querySelector('#info-panel');
const eleCanvasContainer = document.querySelector('#canvas-container');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function randint(a, b) {
  return Math.floor(Math.random() * (b - a)) + a
}


class Snake {
  constructor(
    gridSize = 48,
    gridLineWidth = 1,
    gridBorderWidth = gridLineWidth * 2,
    gridLineColor = '#fff',
    ) {
    this.config = {
      gridSize,
      gridLineWidth,
      gridBorderWidth,
      gridLineColor,
    }
    this.canvas = canvas;
    this.ctx = ctx;
    this.gridRowCount = null;
    this.gridColumnCount = null;
    this.unitPosition = {
      x: 0,
      y: 0,
    };

    this.init();
  }


  init = () => {
    canvas.style.border = `${this.config.gridBorderWidth}px solid ${this.config.gridLineColor}`;
  }


  renderCanvas = () => {
    eleInfoPanel.style.width = window.innerWidth + 'px';
    eleCanvasContainer.style.width = window.innerWidth + 'px';
    const canvasWidth = eleCanvasContainer.offsetWidth;
    const canvasHeight = eleCanvasContainer.offsetHeight;
    const rowBorderWidth = Math.floor((canvasHeight - this.config.gridBorderWidth * 2) % this.config.gridSize);
    const columnBorderWidth = Math.floor((canvasWidth - this.config.gridBorderWidth * 2) % this.config.gridSize)
    this.canvas.width = canvasWidth - columnBorderWidth - this.config.gridBorderWidth * 2;
    this.canvas.height = canvasHeight - rowBorderWidth - this.config.gridBorderWidth * 2;
    this.drawGrid();
    //this.drawFood();
    this.drawArc();
    this.drawPacman();
    this.drawUnit('/static/image/avatar/1.png');
  }


  drawGrid = () => {
    const gridSize = this.config.gridSize;
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.gridRowCount = Math.floor(height / gridSize);
    this.gridColumnCount = Math.floor(width / gridSize);
    
    this.ctx.strokeStyle = this.config.gridLineColor;
    this.ctx.lineWidth = this.config.gridLineWidth;
    this.ctx.beginPath();
    for (let i=0; i<this.gridRowCount; i++) {
      this.ctx.moveTo(0, i*gridSize);
      this.ctx.lineTo(width, i*gridSize);
    }
    for (let j=0; j<this.gridColumnCount; j++) {
      this.ctx.moveTo(j*gridSize, 0);
      this.ctx.lineTo(j*gridSize, height);
    }
    this.ctx.stroke();
  }
    
  drawFood = () => {
    this.ctx.clearRect(this.foodPosition.x, this.foodPosition.y, this.config.gridSize - 4, this.config.gridSize - 4);
    this.foodPosition.x = randint(0, this.gridColumnCount) * this.config.gridSize + 2;
    this.foodPosition.y = randint(0, this.gridRowCount) * this.config.gridSize + 2;
    this.ctx.fillStyle = 'pink';
    this.ctx.fillRect(this.foodPosition.x, this.foodPosition.y, this.config.gridSize - 4, this.config.gridSize - 4);
  }  


  drawArc = () => {
    this.ctx.beginPath();
    this.ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
    this.ctx.stroke();
  }


  drawPacman = () => {
    let x = 200;
    let y = 300;
    let radius = 24;
    let eyeSize = radius * 0.1;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, Math.PI / 6, Math.PI * 22 / 12, false);
    this.ctx.lineTo(x, y);
    this.ctx.closePath(); 
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(x, y - radius * 0.5, eyeSize, 0, Math.PI * 2, false);
    this.ctx.fill();
  }


  drawUnit = (imgSrc) => {
    const img = new Image();
    this.unitPosition.x = randint(0, this.gridColumnCount) * this.config.gridSize + 2;
    this.unitPosition.y = randint(0, this.gridRowCount) * this.config.gridSize + 2;
    img.onload = () => {
      this.ctx.drawImage(img, this.unitPosition.x, this.unitPosition.y, this.config.gridSize - 4, this.config.gridSize - 4);
    };
    img.src = imgSrc;
  }    


  drawSolar = () => {
    const sun = new Image();
    const earth = new Image();
    const moon = new Image();
    function init() {
      sun.src = './static/image/avatar/2.png';
      earth.src = './static/image/avatar/3.png';
      moon.src = './static/image/avatar/4.png';
      window.requestAnimationFrame(draw);
    }
    const draw = () => {
      this.ctx.globalCompositeOperation = 'destination-over';
      this.ctx.clearRect(0, 0, 300, 300);
      this.ctx.fillStyle = 'rgba(0, 0, 0, .4)';
      this.ctx.strokeStyle = 'rgba(0, 153, 255, .4)';
      this.ctx.save();
      this.ctx.translate(150, 150);
      
      const time = new Date();
      ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds(),
      );
      this.ctx.translate(105, 0);
      this.ctx.fillRect(0, -12, 40, 24);
      this.ctx.drawImage(earth, -12, -12);
    }
    init();
  }
  
    


  listener = () => {
    window.addEventListener('load', this.renderCanvas);
    window.addEventListener('resize', this.renderCanvas);
  }
}


function main() {
  let snake = new Snake();
  snake.listener();
  snake.drawSolar();
}


main();
    
