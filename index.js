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
      parsedCollisions = parse2D(collisionsLevel1);
      collisionBlocks = createObjectsFrom2D(parsedCollisions);
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


function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach((door) => door.draw());
  drawDoorText();
  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

// Call init and updateText after defining pageTexts and updateText function
levels[level].init();
animate();
updateText(level);
