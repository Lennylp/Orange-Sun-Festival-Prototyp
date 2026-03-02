const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 980;

const frameCount = 100;
const images = [];
let currentFrame = 0;
let fps = 25; 
let lastFrameTime = 0;

function preloadImages(callback) {
  let loaded = 0;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `frames/frame_${String(i + 1).padStart(4, "0")}.png`;

    img.onload = () => {
      loaded++;
      if (loaded === frameCount) {
        callback();
      }
    };

    images.push(img);
  }
}

function drawFrame(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

function animate(timestamp) {
  if (!lastFrameTime) lastFrameTime = timestamp;

  const delta = timestamp - lastFrameTime;

  if (delta > 1000 / fps) {
    currentFrame = (currentFrame + 1) % frameCount;
    drawFrame(currentFrame);
    lastFrameTime = timestamp;
  }

  requestAnimationFrame(animate);
}

preloadImages(() => {
  drawFrame(0);
  requestAnimationFrame(animate);
});
