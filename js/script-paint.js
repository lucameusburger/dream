/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let drawing = false;
let drawingInverted = false;

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

class Root {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 10 - 5;
    this.speedY = Math.random() * 10 - 5;
    this.maxSize = Math.random() * 100 + 200;
    this.size = Math.random() * 0.1 + 2;
    this.sizeVelocity = Math.random() * 0.2 + 0.05;
    this.angleVelocity = Math.random() * 0.2 - 0.1;
    this.angleX = Math.random() * 2 * Math.PI;
    this.angleY = Math.random() * 2 * Math.PI;
    this.color = color;
    this.brightness = 40;
    this.opacity = 0.01;
  }

  update() {
    this.x += this.speedX * Math.sin(this.angleX);
    this.y += this.speedY * Math.sin(this.angleY);
    this.angleX += this.angleVelocity;
    this.angleY += this.angleVelocity;
    this.size += this.sizeVelocity;
    // if (this.brightness < 80) {
    //   this.brightness += 0.25;
    // }
    if (this.size < this.maxSize) {
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      // ctx.fillStyle = `hsla(${this.color}, 100%, ${this.brightness}%, ${this.opacity})`;
      // ctx.fill();

      // square version
      // ctx.fillStyle = `hsla(${this.color}, 100%, ${this.brightness}%, ${this.opacity})`;
      // ctx.fillRect(this.x, this.y, this.size, this.size);

      // abstract line version
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      requestAnimationFrame(() => this.update());
    }
  }
}

// controls

window.addEventListener("mousemove", (e) => {
  if (drawing) {
    const root = new Root(e.clientX, e.clientY, "#303030");
    root.update();
  }
  if (drawingInverted) {
    const root = new Root(e.clientX, e.clientY, "#f6f6f6");
    root.update();
  }
});

// setInterval(() => {
//   const root = new Root(Math.random() * width, Math.random() * height);
//   root.update();
// }, 2);

window.addEventListener("mousedown", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.button === 0) {
    drawing = true;
  }
  if (e.button === 2) {
    drawingInverted = true;
    console.log("right click");
  }
});

window.addEventListener("mouseup", (e) => {
  e.preventDefault();
  drawing = false;
  drawingInverted = false;
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// change colorPalette on spacebar
window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    colorPalette = [
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
    ];
  }
});
