const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

const lines = text.split("\n").filter((line) => line.length != 0);

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

let current_direction = directions[0];
let guard_position = { x: 0, y: 0 };

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("^")) {
    guard_position = { x: line.indexOf("^"), y: i };
    break;
  }
}

let positions = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  positions.push([]);

  for (let j = 0; j < line.length; j++) {
    positions[i].push(0);
  }
}

positions[guard_position.x][guard_position.y] = 1;
const starting_position = { ...guard_position };

while (true) {
  const next_x = guard_position.x + current_direction.x;
  const next_y = guard_position.y + current_direction.y;

  const line = lines[guard_position.y].split("");
  line[guard_position.x] = ".";
  lines[guard_position.y] = line.join("");

  let next_position;

  try {
    next_position = lines[next_y][next_x];

    if (next_position == undefined) break;
  } catch {
    break;
  }

  if (next_position == ".") guard_position = { x: guard_position.x + current_direction.x, y: guard_position.y + current_direction.y };

  if (next_position == "#") {
    const next_direction_index = (directions.indexOf(current_direction) + 1) % directions.length;

    current_direction = directions[next_direction_index];

    guard_position = { x: guard_position.x + current_direction.x, y: guard_position.y + current_direction.y };
  }

  positions[guard_position.y][guard_position.x] = 1;
}

// actual part 2, I used reddit to check if my reasoning was right
const checkObstacle = () => {
  const passed = [];

  while (true) {
    passed.push({
      x: guard_position.x,
      y: guard_position.y,
      direction: current_direction,
    });

    const next_x = guard_position.x + current_direction.x;
    const next_y = guard_position.y + current_direction.y;

    const line = lines[guard_position.y].split("");
    line[guard_position.x] = ".";
    lines[guard_position.y] = line.join("");

    let next_position;

    try {
      next_position = lines[next_y][next_x];

      if (next_position == undefined) break;
    } catch {
      break;
    }

    if (next_position == ".") {
      guard_position = { x: guard_position.x + current_direction.x, y: guard_position.y + current_direction.y };

      if (passed.some((p) => p.x == guard_position.x && p.y == guard_position.y && p.direction == current_direction)) {
        return true;
      }
    }
    if (next_position == "#" || next_position == "0") {
      const next_direction_index = (directions.indexOf(current_direction) + 1) % directions.length;

      current_direction = directions[next_direction_index];
    }
  }

  return false;
};

let different_obstacles_positions = 0;

for (let i = 0; i < positions.length; i++) {
  for (let j = 0; j < positions[i].length; j++) {
    if (positions[i][j] != 1) continue;
    if (i == starting_position.y && j == starting_position.x) continue;

    guard_position = starting_position;
    current_direction = directions[0];

    const line = lines[i].split("");
    line[j] = "0";
    lines[i] = line.join("");

    const is_loop = checkObstacle();

    if (is_loop) {
      different_obstacles_positions++;
    }

    console.log("is_loop: ", i, j, is_loop);

    line[j] = ".";
    lines[i] = line.join("");
  }
}

// log positions
for (let i = 0; i < positions.length; i++) {
  let line = "";

  for (let j = 0; j < positions[i].length; j++) {
    line += positions[i][j];
  }
}

console.log("different obstacle positions: ", different_obstacles_positions);
