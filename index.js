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
  0: '<h1>Hello there! I am Kushagra... </h1><p>Welcome to my interactive portfolio, hope you have a good time :3</p>',
};

function updateText(roomIndex) {
  const bio = document.getElementById('bio');
  bio.innerHTML = pageTexts[roomIndex] || '';
}

let currentRoom = 0;

const rooms = [
  {
    name: 'Home',
    backgroundSrc: './img/backgroundLevel1.png',
    collisionData: collisionsLevel1,
    doors: [
      {
        position: { x: 350, y: 270 },
        label: 'LinkedIn', labelX: 358, labelY: 260,
        target: { type: 'external', url: 'https://www.linkedin.com/in/kushagra-agarwal-88614b219/' },
      },
      {
        position: { x: 550, y: 270 },
        label: 'GitHub', labelX: 565, labelY: 260,
        target: { type: 'external', url: 'https://github.com/Kush3008' },
      },
      {
        position: { x: 750, y: 270 },
        label: 'Behance', labelX: 762, labelY: 260,
        target: { type: 'external', url: 'https://www.behance.net/Kush3008' },
      },
    ],
    interactables: [],
  },
  {
    name: 'Room 2',
    backgroundSrc: './img/backgroundLevel2.png',
    collisionData: collisionsLevel2,
    doors: [],
    interactables: [],
  },
  {
    name: 'Room 3',
    backgroundSrc: './img/backgroundLevel3.png',
    collisionData: collisionsLevel3,
    doors: [],
    interactables: [],
  },
  {
    name: 'Room 4',
    backgroundSrc: './img/backgroundLevel2.png',
    collisionData: collisionsLevel2,
    doors: [],
    interactables: [],
  },
  {
    name: 'Room 5',
    backgroundSrc: './img/backgroundLevel3.png',
    collisionData: collisionsLevel3,
    doors: [],
    interactables: [],
  },
];

function initRoom(index) {
  const room = rooms[index];

  parsedCollisions = parse2D(room.collisionData);
  collisionBlocks = createObjectsFrom2D(parsedCollisions);
  player.collisionBlocks = collisionBlocks;
  if (player.currentAnimation) player.currentAnimation.isActive = false;

  background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: room.backgroundSrc,
  });

  doors = room.doors.map(function(def) {
    var sprite = new Sprite({
      position: def.position,
      imageSrc: './img/doorOpen.png',
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    });
    sprite.target = def.target;
    sprite.label  = def.label;
    sprite.labelX = def.labelX;
    sprite.labelY = def.labelY;
    return sprite;
  });

  updateText(index);
}

function transitionToRoom(index, spawnSide) {
  if (index < 0 || index >= rooms.length) return;
  if (player.preventInput) return;
  player.preventInput = true;

  gsap.to(overlay, {
    opacity: 1,
    duration: 0.3,
    onComplete: function() {
      currentRoom = index;
      initRoom(index);
      player.velocity.x = 0;
      player.velocity.y = 0;
      if (spawnSide === 'fromLeft') {
        player.position = { x: 10, y: 200 };
      } else {
        player.position = { x: canvas.width - player.width - 70, y: 200 };
      }
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: function() {
          player.preventInput = false;
        },
      });
    },
  });
}

player.onRoomEdgeRight = function() { transitionToRoom(currentRoom + 1, 'fromLeft'); };
player.onRoomEdgeLeft  = function() { transitionToRoom(currentRoom - 1, 'fromRight'); };

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

const overlay = { opacity: 0 };

function drawDoorText() {
  c.font = '10px "Press Start 2P"';
  c.fillStyle = 'Orange';
  c.shadowColor = 'black';
  c.shadowOffsetX = 1;
  c.shadowOffsetY = 1;
  c.shadowBlur = 2.25;

  doors.forEach(function(door) {
    if (door.label) c.fillText(door.label, door.labelX, door.labelY);
  });

  c.shadowColor = 'none';
  c.shadowOffsetX = 0;
  c.shadowOffsetY = 0;
  c.shadowBlur = 0;
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach(function(door) { door.draw(); });
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

initRoom(0);
animate();
