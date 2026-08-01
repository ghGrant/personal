(function () {
  const canvas = document.getElementById('bg-hearts-canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const heartPattern = [
    [0,1,1,0,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0],
  ];

  const colors = ['#d9534f', '#ff6f61', '#f5a3a2', '#e60073', '#ff8fa3'];

  class BgHeart {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.pixelSize = 2 + Math.random() * 3;
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 40;
      this.speed = 0.3 + Math.random() * 0.8;
      this.drift = (Math.random() - 0.5) * 0.4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 0.3 + Math.random() * 0.4;
    }

    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -40) this.reset();
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      for (let row = 0; row < heartPattern.length; row++) {
        for (let col = 0; col < heartPattern[row].length; col++) {
          if (heartPattern[row][col]) {
            ctx.fillRect(
              this.x + col * this.pixelSize,
              this.y + row * this.pixelSize,
              this.pixelSize,
              this.pixelSize
            );
          }
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  const hearts = Array.from({ length: 30 }, () => new BgHeart());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();