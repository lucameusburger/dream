/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

document.addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    drawRandomArt();
  }
});

function drawRandomArt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw first shape
  ctx.beginPath();
  ctx.moveTo(100 + Math.random() * 100, 100 + Math.random() * 100);
  ctx.quadraticCurveTo(200 + Math.random() * 100, 10 + Math.random() * 100, 300 + Math.random() * 100, 100 + Math.random() * 100);
  ctx.quadraticCurveTo(400 + Math.random() * 100, 190 + Math.random() * 100, 300 + Math.random() * 100, 300 + Math.random() * 100);
  ctx.quadraticCurveTo(200 + Math.random() * 100, 390 + Math.random() * 100, 100 + Math.random() * 100, 300 + Math.random() * 100);
  ctx.quadraticCurveTo(10 + Math.random() * 100, 190 + Math.random() * 100, 100 + Math.random() * 100, 100 + Math.random() * 100);
  ctx.fill();

  // Draw second shape
  ctx.beginPath();
  ctx.moveTo(200 + Math.random() * 100, 200 + Math.random() * 100);
  ctx.lineTo(400 + Math.random() * 100, 200 + Math.random() * 100);
  ctx.lineTo(400 + Math.random() * 100, 400 + Math.random() * 100);
  ctx.lineTo(300 + Math.random() * 100, 400 + Math.random() * 100);
  ctx.lineTo(300 + Math.random() * 100, 300 + Math.random() * 100);
  ctx.lineTo(200 + Math.random() * 100, 300 + Math.random() * 100);
  ctx.lineTo(200 + Math.random() * 100, 200 + Math.random() * 100);
  ctx.fill();

  // Draw third shape
  ctx.beginPath();
  ctx.moveTo(400 + Math.random() * 100, 100 + Math.random() * 100);
  ctx.arc(400 + Math.random() * 100, 100 + Math.random() * 100, 50 + Math.random() * 50, 0, 2 * Math.PI);
  ctx.fill();

  // Draw fourth shape
  ctx.beginPath();
  ctx.moveTo(150 + Math.random + 100, 150 + Math.random() * 100);
  ctx.bezierCurveTo(250 + Math.random() * 100, 250 + Math.random() * 100, 350 + Math.random() * 100, 250 + Math.random() * 100, 450 + Math.random() * 100, 150 + Math.random() * 100);
  ctx.fill();
}

drawRandomArt();
