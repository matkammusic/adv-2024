const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`;

const lines = text.split("\n").filter((line) => line.length != 0);

const map = [];

for (let i = 0; i < lines.length; i++) {
  map.push([]);

  for (let j = 0; j < lines[i].length; j++) {
    map[i].push(parseInt(lines[i][j]));
  }
}

const checkAllTrail = (summits, position) => {
  if (position.x < 0 || position.x >= map[0].length || position.y < 0 || position.y >= map.length) return summits;

  const elevation = map[position.y][position.x];

  if (elevation == 9) {
    // for (let i = 0; i < summits.length; i++) {
    //   if (summits[i].x == position.x && summits[i].y == position.y) return summits;
    // }

    summits.push(position);
    return summits;
  }

  if (position.y - 1 >= 0) {
    const top = map[position.y - 1][position.x];

    if (top == elevation + 1) {
      //check top
      checkAllTrail(summits, { x: position.x, y: position.y - 1 });
    }
  }

  if (position.x + 1 < map[position.y].length) {
    const right = map[position.y][position.x + 1];

    if (right == elevation + 1) {
      // check right
      checkAllTrail(summits, { x: position.x + 1, y: position.y });
    }
  }

  if (position.y + 1 < map.length) {
    const bottom = map[position.y + 1][position.x];

    if (bottom == elevation + 1) {
      // check bottom
      checkAllTrail(summits, { x: position.x, y: position.y + 1 });
    }
  }

  if (position.x - 1 >= 0) {
    const left = map[position.y][position.x - 1];

    if (left == elevation + 1) {
      //check left
      checkAllTrail(summits, { x: position.x - 1, y: position.y });
    }
  }

  return summits;
};

let all_summits = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const elevation = map[i][j];

    if (elevation != 0) continue;

    const summits = checkAllTrail([], { x: j, y: i });

    all_summits += summits.length;
  }
}

console.log("all summits: ", all_summits);
