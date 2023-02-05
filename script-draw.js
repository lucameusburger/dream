/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

let colorPalette = [200, 210, 240, 260, 290, 300, 320, 340, 360];

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const drawing = false;

ctx.width = width;
ctx.height = height;

resize();
window.onresize = resize;

function resize() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}

class Root {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 10 - 5;
    this.speedY = Math.random() * 10 - 5;
    this.maxSize = Math.random() * 10 + 5;
    this.size = Math.random() * 0.1 + 2;
    this.sizeVelocity = Math.random() * 0.2 + 0.05;
    this.angleVelocity = Math.random() * 0.2 - 0.1;
    this.angleX = Math.random() * 2 * Math.PI;
    this.angleY = Math.random() * 2 * Math.PI;
    this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    this.brightness = 40;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX * Math.sin(this.angleX);
    this.y += this.speedY * Math.sin(this.angleY);
    this.angleX += this.angleVelocity;
    this.angleY += this.angleVelocity;
    this.size += this.sizeVelocity;
    if (this.brightness < 80) {
      this.brightness += 0.25;
    }
    if (this.size < this.maxSize) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = `hsla(${this.color}, 100%, ${this.brightness}%, ${this.opacity})`;
      ctx.fill();

      requestAnimationFrame(() => this.update());
    }
  }
}

// controls

window.addEventListener("mousemove", (e) => {
  if (drawing) {
    for (let i = 0; i < 10; i++) {
      const root = new Root(e.clientX, e.clientY);
      root.update();
    }
  }
});

setInterval(() => {
  const root = new Root(Math.random() * width, Math.random() * height);
  root.update();
}, 2);

window.addEventListener("mousedown", (e) => {
  // set drawing to true
  drawing = true;
});

window.addEventListener("mouseup", (e) => {
  // set drawing to false
  drawing = false;
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
