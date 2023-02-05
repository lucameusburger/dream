/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 120;

let canvasWidth;
let canvasHeight;
let columns;
let rows;

let angles;
let currentCircle;
let targetAngle;
let rotationAngle;
let animationInProgress;
const changeSpeed = 12;

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvasWidth = canvas.offsetWidth;
  canvasHeight = canvas.offsetHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  columns = Math.floor(canvasWidth / size);
  rows = Math.floor(canvasHeight / size);
  init();
}

function init() {
  angles = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      angles.push(Math.floor(Math.random() * 4) * 90);
    }
  }
  currentCircle = 0;
  targetAngle = 0;
  rotationAngle = 0;
  animationInProgress = false;
}

function draw() {
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let k = i * columns + j;
      ctx.save();
      ctx.translate(j * size + size / 2, i * size + size / 2);
      ctx.rotate((angles[k] * Math.PI) / 180);
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, 0.5 * Math.PI);
      ctx.lineWidth = 64;

      // ctx.strokeStyle = "#00ff00";
      ctx.strokeStyle = "#000000";

      // ctx.strokeStyle = "hsl(" + (angles[k] + 90) + ", 100%, 50%)";

      ctx.stroke();
      ctx.restore();
    }
  }
}

function update() {
  if (!animationInProgress) {
    currentCircle = Math.floor(Math.random() * columns * rows);

    targetAngle = Math.floor(Math.random() * 4) * 90;
    rotationAngle = (targetAngle - angles[currentCircle]) / 30;
    animationInProgress = true;
  } else {
    angles[currentCircle] += rotationAngle;
    if (Math.abs(angles[currentCircle] - targetAngle) < 0.1) {
      angles[currentCircle] = targetAngle;
      animationInProgress = false;
    }
  }
  draw();
}

setInterval(update, changeSpeed);
