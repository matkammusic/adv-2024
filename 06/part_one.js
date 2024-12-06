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

// const checkPosition = () => {
//   try {
//     let pos = lines[guard_position.y][guard_position.x];
//     return true;
//   } catch {
//     return false;
//   }
// };

positions[guard_position.x][guard_position.y] = 1;

while (true) {
  const next_x = guard_position.x + current_direction.x;
  const next_y = guard_position.y + current_direction.y;

  let next_position;

  try {
    next_position = lines[next_y][next_x];

    if (next_position == undefined) break;
  } catch {
    break;
  }

  const line = lines[guard_position.y].split("");
  line[guard_position.x] = ".";
  lines[guard_position.y] = line.join("");

  if (next_position == ".") guard_position = { x: guard_position.x + current_direction.x, y: guard_position.y + current_direction.y };

  if (next_position == "#") {
    const next_direction_index = (directions.indexOf(current_direction) + 1) % directions.length;

    current_direction = directions[next_direction_index];

    guard_position = { x: guard_position.x + current_direction.x, y: guard_position.y + current_direction.y };
  }

  positions[guard_position.y][guard_position.x] = 1;
}

let distinct_position = 0;

for (let i = 0; i < positions.length; i++) {
  for (let j = 0; j < positions[i].length; j++) {
    if (positions[i][j] == 1) distinct_position++;
  }
}

console.log("distinct positions: ", distinct_position);
