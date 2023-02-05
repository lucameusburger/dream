/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas");

// set opacity of canvas css to .5
canvas.style.opacity = 0.2;
let scale = 1;

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

function noise(ctx) {
  const w = ctx.canvas.width,
    h = ctx.canvas.height,
    iData = ctx.createImageData(w, h),
    buffer32 = new Uint32Array(iData.data.buffer),
    len = buffer32.length;
  let i = 0;

  for (; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

  ctx.putImageData(iData, 0, 0);
}

noise(ctx);

(function loop() {
  noise(ctx);
  requestAnimationFrame(loop);
})();
