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
const NB_STEPS = 1000;

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

const outputs = [];

for (let i = 0; i <= 6586; i++) {
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

  console.log("step: ", i);

  let lines = "";

  for (let j = 0; j < SPACE_HEIGHT; j++) {
    let line = "";
    for (let k = 0; k < SPACE_WIDTH; k++) {
      const robots = space[j][k];

      if (robots.length == 0) {
        line += ".";
      } else {
        line += "#";
      }
    }

    lines += line + "\n";
  }

  if (outputs.filter((other) => other == lines).length != 0) {
    console.log("found a loop");
    break;
  }

  outputs.push(lines);
}

const filtered_outputs = [];

const check = (grid) => {
  for (let j = 0; j < grid.length; j++) {
    for (let k = 0; k < grid[j].length; k++) {
      if (grid[j][k] == "#") {
        // get bottom right and bottom left neighbors
        let bottom_right = false;
        let bottom_left = false;

        if (j + 1 < grid.length && k + 1 < grid[j].length) {
          if (grid[j + 1][k + 1] == "#") {
            bottom_right = true;
          }
        }

        if (j + 1 < grid.length && k - 1 >= 0) {
          if (grid[j + 1][k - 1] == "#") {
            bottom_left = true;
          }
        }

        if (bottom_right && bottom_left) {
          return true;
        }
      }
    }
  }

  return false;
};

for (let i = 0; i < outputs.length; i++) {
  console.log("output: ", i);

  const lines = outputs[i].split("\n").filter((line) => line.length != 0);
  const grid = [];

  for (let j = 0; j < lines.length; j++) {
    grid.push([]);
    for (let k = 0; k < lines[j].length; k++) {
      grid[j].push(lines[j][k]);
    }
  }

  if (check(grid)) {
    filtered_outputs.push(outputs[i]);
  }
}

console.log("filtered_outputs: ", filtered_outputs.length);

const check2 = (grid) => {
  for (let j = 0; j < grid.length; j++) {
    for (let k = 0; k < grid[j].length; k++) {
      if (grid[j][k] == "#") {
        // get bottom right and bottom left neighbors on 2 levels
        let bottom_right = false;
        let bottom_left = false;
        let bottom_right2 = false;
        let bottom_left2 = false;

        if (j + 1 < grid.length && k + 1 < grid[j].length) {
          if (grid[j + 1][k + 1] == "#") {
            bottom_right = true;

            if (j + 2 < grid.length && k + 2 < grid[j].length) {
              if (grid[j + 2][k + 2] == "#") {
                bottom_right2 = true;
              }
            }
          }
        }

        if (j + 1 < grid.length && k - 1 >= 0) {
          if (grid[j + 1][k - 1] == "#") {
            bottom_left = true;

            if (j + 2 < grid.length && k - 2 >= 0) {
              if (grid[j + 2][k - 2] == "#") {
                bottom_left2 = true;
              }
            }
          }
        }

        if (bottom_right && bottom_left && bottom_right2 && bottom_left2) {
          return true;
        }
      }
    }
  }

  return false;
};

const filtered_outputs2 = [];

for (let i = 0; i < filtered_outputs.length; i++) {
  console.log("fltered output: ", i);

  const lines = filtered_outputs[i].split("\n").filter((line) => line.length != 0);
  const grid = [];

  for (let j = 0; j < lines.length; j++) {
    grid.push([]);
    for (let k = 0; k < lines[j].length; k++) {
      grid[j].push(lines[j][k]);
    }
  }

  if (check2(grid)) {
    filtered_outputs2.push(filtered_outputs[i]);
  }
}

console.log("filtered_outputs2: ", filtered_outputs2.length);

// for (let i = 0; i < filtered_outputs2.length; i++) {
//   console.log(filtered_outputs2[i]);

//   await Bun.write(`./outputs/output_${i}.txt`, filtered_outputs2[i]);
// }

// after looking in the output files, the tree can be seen in the output_36.txt file

const tree_output = filtered_outputs2[36];

const second = outputs.indexOf(tree_output);

// + 1 because the first second is 0
console.log("second : ", second + 1);
