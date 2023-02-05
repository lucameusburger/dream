/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function draw() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 10; i++) {
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = x1 + (mouseX - x1) * 50;
    const y2 = y1 + (mouseY - y1) * 50;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

draw();
