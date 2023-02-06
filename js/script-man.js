/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

ctx.width = width;
ctx.height = height;

resize();
window.onresize = resize;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}

let stickFigures = [];
let stickFigureSize = 40;

function drawStickFigure(x, y, inverted) {
  ctx.beginPath();
  // draw head
  ctx.arc(x, y, stickFigureSize / 2, 0, Math.PI * 2, false);
  ctx.fillStyle = "black";
  ctx.fill();
}

function updateStickFigures() {
  for (let i = 0; i < stickFigures.length; i++) {
    let stickFigure = stickFigures[i];
    let speed = 5;
    let dx = mouseX - stickFigure.x;
    let dy = mouseY - stickFigure.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    let prevX = stickFigure.x;
    let prevY = stickFigure.y;
    stickFigure.x += directionX * speed;
    stickFigure.y += directionY * speed;
    stickFigure.inverted = !stickFigure.inverted;
    drawStickFigure(stickFigure.x, stickFigure.y, stickFigure.inverted);
  }
  requestAnimationFrame(updateStickFigures);
}

canvas.onclick = function (e) {
  stickFigures.push({ x: e.clientX, y: e.clientY, inverted: false });
};

// spawn 300 stick figures
for (let i = 0; i < 300; i++) {
  stickFigures.push({ x: Math.random() * width, y: Math.random() * height, inverted: false });
}

let mouseX = 0;
let mouseY = 0;
canvas.onmousemove = function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

updateStickFigures();
