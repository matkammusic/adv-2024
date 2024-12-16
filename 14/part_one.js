const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`;

// const text = `p=2,4 v=2,-3`;

const lines = text.split("\n").filter((line) => line.length != 0);

const SPACE_WIDTH = 101;
const SPACE_HEIGHT = 103;
const NB_STEPS = 100;

const space = [];

for (let i = 0; i < SPACE_HEIGHT; i++) {
  space.push([]);
  for (let j = 0; j < SPACE_WIDTH; j++) {
    space[i].push([]);
  }
}

class Robot {
  constructor(x, y, vx, vy) {
    this.id = Math.random();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.has_moved = false;
  }

  move() {
    const new_x = this.mod(this.x + this.vx, SPACE_WIDTH);
    const new_y = this.mod(this.y + this.vy, SPACE_HEIGHT);

    space[this.y][this.x] = space[this.y][this.x].filter((robot) => robot.id != this.id);

    this.x = new_x;
    this.y = new_y;

    this.has_moved = true;

    space[new_y][new_x].push(this);
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  prepare_move() {
    this.has_moved = false;
  }
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const parts = line.split(" ");

  const p = parts[0].split(",");
  const v = parts[1].split(",");

  const x = parseInt(p[0].split("=")[1]);
  const y = parseInt(p[1]);

  const vx = parseInt(v[0].split("=")[1]);
  const vy = parseInt(v[1]);

  const robot = new Robot(x, y, vx, vy);
  space[robot.y][robot.x].push(robot);
}

for (let i = 0; i < NB_STEPS; i++) {
  for (let j = 0; j < SPACE_HEIGHT; j++) {
    for (let k = 0; k < SPACE_WIDTH; k++) {
      const robots = space[j][k];

      if (robots.length == 0) continue;

      for (let l = 0; l < robots.length; l++) {
        const robot = robots[l];
        if (robot.has_moved) continue;

        robot.move();
      }
    }
  }

  for (let j = 0; j < SPACE_HEIGHT; j++) {
    for (let k = 0; k < SPACE_WIDTH; k++) {
      const robots = space[j][k];

      if (robots.length == 0) continue;

      for (let l = 0; l < robots.length; l++) {
        const robot = robots[l];
        robot.prepare_move();
      }
    }
  }
}

let q1_robots = 0; // top right
let q2_robots = 0; // bottom right
let q3_robots = 0; // bottom left
let q4_robots = 0; // top left

for (let i = 0; i < SPACE_HEIGHT; i++) {
  for (let j = 0; j < SPACE_WIDTH; j++) {
    const robots = space[i][j];

    if (robots.length == 0) continue;

    if (i < Math.floor(SPACE_HEIGHT / 2) && j < Math.floor(SPACE_WIDTH / 2)) {
      q1_robots += robots.length;
    } else if (i < Math.floor(SPACE_HEIGHT / 2) && j >= Math.ceil(SPACE_WIDTH / 2)) {
      q2_robots += robots.length;
    } else if (i >= Math.ceil(SPACE_HEIGHT / 2) && j < Math.floor(SPACE_WIDTH / 2)) {
      q3_robots += robots.length;
    } else if (i >= Math.ceil(SPACE_HEIGHT / 2) && j >= Math.ceil(SPACE_WIDTH / 2)) {
      q4_robots += robots.length;
    }
  }
}

console.log("q1_robots: ", q1_robots);
console.log("q2_robots: ", q2_robots);
console.log("q3_robots: ", q3_robots);
console.log("q4_robots: ", q4_robots);

const safety_factor = q1_robots * q2_robots * q3_robots * q4_robots;

console.log("safety factor: ", safety_factor);
