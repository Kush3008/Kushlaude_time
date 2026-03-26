const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player({
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: { frameRate: 11, frameBuffer: 2, loop: true, imageSrc: './img/king/idle.png' },
    idleLeft: { frameRate: 11, frameBuffer: 2, loop: true, imageSrc: './img/king/idleLeft.png' },
    runRight: { frameRate: 8, frameBuffer: 4, loop: true, imageSrc: './img/king/runRight.png' },
    runLeft: { frameRate: 8, frameBuffer: 4, loop: true, imageSrc: './img/king/runLeft.png' },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () => {
        console.log('complete animation');
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

const pageTexts = {
  1: '<h1>Hello there! I am Kushagra... </h1><p>Welcome to my interactive portfolio, hope you have a good time :3</p>',
};

function updateText(level) {
  const bio = document.getElementById('bio');
  bio.innerHTML = pageTexts[level] || '';
}

let level = 1;
const levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position = { x: 200, y: 200 }; // Ensure player starts at the correct position
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel1.png',
      });

      doors = [
        new Sprite({
          position: { x: 350, y: 270 }, // LinkedIn Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
        new Sprite({
          position: { x: 550, y: 270 }, // GitHub Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
        new Sprite({
          position: { x: 750, y: 270 }, // Behance Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      updateText(1); // Update text for home page
    },
  },
};

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

const overlay = { opacity: 0 };

function drawDoorText() {
  if (level === 1) { // Show text in level 1
    // Set default font style for all text
    c.font = '10px "Press Start 2P"';
    c.fillStyle = 'Orange';

    // Text shadow properties (adjust as needed)
    const shadowXOffset = 1;
    const shadowYOffset = 1;
    const shadowBlur = 2.25;
    const shadowColor = 'black';

    // Draw "LinkedIn", "GitHub", "Behance" with stroke effect
    c.shadowColor = shadowColor;
    c.shadowOffsetX = shadowXOffset;
    c.shadowOffsetY = shadowYOffset;
    c.shadowBlur = shadowBlur;
    c.fillText('LinkedIn', 358, 260);
    c.fillText('GitHub', 565, 260);
    c.fillText('Behance', 762, 260);

    // Reset shadow properties for normal text rendering
    c.shadowColor = 'none';
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.shadowBlur = 0;
  }
}

function drawHUD() {
  c.font = '8px "Press Start 2P"';
  c.fillStyle = 'white';
  c.fillText('Position: ' + player.position.x + ', ' + player.position.y, 10, 550);
  c.fillText('Sequence: ' + actionSequence.join(', '), 10, 565);
}

// class Particle {
//   constructor(x, y, size, color, velocity) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//     this.velocity = { x: Math.random() * 1 - 0.5, y: Math.random() * 0.5 - 0.25 }; // Slower velocity range
//   }

//   draw() {
//     c.fillStyle = this.color;
//     c.beginPath();
//     c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     c.fill();
//   }

//   update() {
//     this.x += this.velocity.x;
//     this.y += this.velocity.y;
  
//     // Check for boundary collision (adjust as needed)
//     if (this.x < 0 || this.x > canvas.width) {
//       this.velocity.x *= -1; // Reverse x velocity on collision
//     }
//     if (this.y < 0 || this.y > canvas.height) {
//       this.velocity.y *= -1; // Reverse y velocity on collision
//     }
  
//     this.size *= 0.95; // Shrink particle
//   }
// }

// const particles = [];

// function createParticles(x, y) {
//   for (let i = 0; i < 1; i++) {
//     const offsetX = Math.random() * -1000 + 800; // Random offset within -5 to 5 range (adjust as needed)
//     const offsetY = Math.random() * -1000 + 750; // Random offset within -5 to 5 range (adjust as needed)
//     particles.push(new Particle(x + offsetX, y + offsetY, 5, 'white', { x: Math.random() * 0.5 - 0.25, y: Math.random() * 0.5 - 0.25 }));
//   }
// }

// function drawParticles() {
//   particles.forEach((particle, index) => {
//     particle.update();
//     particle.draw();
//     if (particle.size < 0.5) {
//       particles.splice(index, 1); // Remove small particles
//     }
//   });
// }

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach((door) => door.draw());
  drawDoorText();
  // createParticles(player.position.x, player.position.y); // Example: Create 100 particles
  // drawParticles();
  drawHUD();
  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

// Example usage: createParticles(player.position.x, player.position.y);

// Call init and updateText after defining pageTexts and updateText function
levels[level].init();
animate();
updateText(level);
