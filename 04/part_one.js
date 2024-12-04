const { StringInputParams } = require("tweakpane");

const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX";

const grid = [];
const lines = text.split("\n");

lines.splice(-1);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const letters = [];

  for (let ii = 0; ii < line.length; ii++) {
    const letter = line[ii];

    letters.push(letter);
  }

  grid.push(letters);
}

let nb_xmas = 0;

for (let i = 0; i < grid.length; i++) {
  for (let ii = 0; ii < grid[i].length; ii++) {
    const letter = grid[i][ii];

    if (letter != "X") continue;

    // contains max 8 strings
    const strings = [];

    if (i <= 2 && ii <= 2) {
      // top left corner
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];
      const bottom_right = grid[i][ii] + grid[i + 1][ii + 1] + grid[i + 2][ii + 2] + grid[i + 3][ii + 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];

      strings.push(right, bottom_right, bottom);
    } else if (i <= 2 && ii >= grid[i].length - 3) {
      // top right corner
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const bottom_left = grid[i][ii] + grid[i + 1][ii - 1] + grid[i + 2][ii - 2] + grid[i + 3][ii - 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];

      strings.push(left, bottom_left, bottom);
    } else if (i >= grid.length - 3 && ii <= 2) {
      // bottom left corner
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];
      const top_right = grid[i][ii] + grid[i - 1][ii + 1] + grid[i - 2][ii + 2] + grid[i - 3][ii + 3];
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];

      strings.push(right, top_right, top);
    } else if (i >= grid.length - 3 && ii >= grid[i].length - 3) {
      // bottom right corner
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const top_left = grid[i][ii] + grid[i - 1][ii - 1] + grid[i - 2][ii - 2] + grid[i - 3][ii - 3];
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];

      strings.push(left, top_left, top);
    } else if (i <= 2) {
      // top side
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const bottom_left = grid[i][ii] + grid[i + 1][ii - 1] + grid[i + 2][ii - 2] + grid[i + 3][ii - 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];
      const bottom_right = grid[i][ii] + grid[i + 1][ii + 1] + grid[i + 2][ii + 2] + grid[i + 3][ii + 3];
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];

      strings.push(left, bottom_left, bottom, bottom_right, right);
    } else if (ii <= 2) {
      // left side
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];
      const top_right = grid[i][ii] + grid[i - 1][ii + 1] + grid[i - 2][ii + 2] + grid[i - 3][ii + 3];
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];
      const bottom_right = grid[i][ii] + grid[i + 1][ii + 1] + grid[i + 2][ii + 2] + grid[i + 3][ii + 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];
      // console.log("ls");
      strings.push(top, top_right, right, bottom_right, bottom);

      // console.log(strings);
    } else if (i >= grid.length - 3) {
      // bottom side
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const top_left = grid[i][ii] + grid[i - 1][ii - 1] + grid[i - 2][ii - 2] + grid[i - 3][ii - 3];
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];
      const top_right = grid[i][ii] + grid[i - 1][ii + 1] + grid[i - 2][ii + 2] + grid[i - 3][ii + 3];
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];

      strings.push(left, top_left, top, top_right, right);
    } else if (ii >= grid[i].length - 3) {
      // right side
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];
      const top_left = grid[i][ii] + grid[i - 1][ii - 1] + grid[i - 2][ii - 2] + grid[i - 3][ii - 3];
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const bottom_left = grid[i][ii] + grid[i + 1][ii - 1] + grid[i + 2][ii - 2] + grid[i + 3][ii - 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];

      strings.push(top, top_left, left, bottom_left, bottom);
    } else {
      // all others
      const top = grid[i][ii] + grid[i - 1][ii] + grid[i - 2][ii] + grid[i - 3][ii];
      const top_right = grid[i][ii] + grid[i - 1][ii + 1] + grid[i - 2][ii + 2] + grid[i - 3][ii + 3];
      const right = grid[i][ii] + grid[i][ii + 1] + grid[i][ii + 2] + grid[i][ii + 3];
      const bottom_right = grid[i][ii] + grid[i + 1][ii + 1] + grid[i + 2][ii + 2] + grid[i + 3][ii + 3];
      const bottom = grid[i][ii] + grid[i + 1][ii] + grid[i + 2][ii] + grid[i + 3][ii];
      const bottom_left = grid[i][ii] + grid[i + 1][ii - 1] + grid[i + 2][ii - 2] + grid[i + 3][ii - 3];
      const left = grid[i][ii] + grid[i][ii - 1] + grid[i][ii - 2] + grid[i][ii - 3];
      const top_left = grid[i][ii] + grid[i - 1][ii - 1] + grid[i - 2][ii - 2] + grid[i - 3][ii - 3];

      strings.push(top, top_right, right, bottom_right, bottom, bottom_left, left, top_left);
    }

    const xmass = strings.filter((string) => string == "XMAS");

    nb_xmas += xmass.length;
  }
}

console.log("nb xmas: ", nb_xmas);
