const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;

const lines = text.split("\n").filter((line) => line.length != 0);

const antinode_positions = [];

for (let i = 0; i < lines.length; i++) {
  antinode_positions.push([]);

  for (let j = 0; j < lines[i].length; j++) {
    antinode_positions[i].push(".");
  }
}

const compute_distance = (pair) => {
  const distance = { x: pair[1].x - pair[0].x, y: pair[1].y - pair[0].y };
  return distance;
};

const check_if_inbound = (point, distance) => {
  if (point.x - distance.x < 0 || point.x + distance < 0) return false;
  if (point.x - distance.x >= antinode_positions[0].length || point.x + distance.x >= antinode_positions[0].length) return false;

  if (point.y - distance.y < 0 || point.y + distance.y < 0) return false;
  if (point.y - distance.y >= antinode_positions.length || point.y + distance.y >= antinode_positions.length) return false;

  return true;
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  for (let j = 0; j < line.length; j++) {
    const char = line[j];

    if (char == ".") continue;

    const pairs = [];

    for (let k = 0; k < lines.length; k++) {
      for (let l = 0; l < lines[k].length; l++) {
        const other = lines[k][l];

        if (i == k && j == l) continue;
        if (other != char) continue;

        pairs.push([
          { x: j, y: i },
          { x: l, y: k },
        ]);
      }
    }

    for (let m = 0; m < pairs.length; m++) {
      const pair = pairs[m];
      const distance = compute_distance(pair);

      if (check_if_inbound(pair[0], distance)) {
        antinode_positions[pair[0].y - distance.y][pair[0].x - distance.x] = "#";
      }

      if (check_if_inbound(pair[1], distance)) {
        antinode_positions[pair[1].y + distance.y][pair[1].x + distance.x] = "#";
      }
    }
  }
}

let unique_antinode_positions = 0;

for (let i = 0; i < antinode_positions.length; i++) {
  for (let j = 0; j < antinode_positions[i].length; j++) {
    if (antinode_positions[i][j] == "#") unique_antinode_positions++;
  }
}

console.log("unique antinode positions: ", unique_antinode_positions);
