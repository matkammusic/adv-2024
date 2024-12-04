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

console.log("------------------------------ start ------------------------------");

for (let i = 1; i < grid.length - 1; i++) {
  for (let ii = 1; ii < grid[i].length - 1; ii++) {
    const letter = grid[i][ii];

    if (letter != "A") continue;

    // contains max 8 strings
    const strings = [];

    // if (i <= 0 || ii <= 0 || i >= grid.length - 2 || ii >= grid[i].length - 2) continue;

    const top_bottom = grid[i - 1][ii - 1] + grid[i][ii] + grid[i + 1][ii + 1];
    const bottom_top = grid[i + 1][ii - 1] + grid[i][ii] + grid[i - 1][ii + 1];
    // const rbottom_ltop = grid[i + 1][ii + 1] + grid[i][ii] + grid[i - 1][ii - 1];
    // const rtop_lbottom = grid[i - 1][ii + 1] + grid[i][ii] + grid[i + 1][ii - 1];

    strings.push(top_bottom, bottom_top);

    const xmass = strings.filter((string) => string == "MAS" || string == "SAM");

    console.log(i, ii, strings);

    if (xmass.length == 2) nb_xmas++;
  }
}

console.log("nb xmas: ", nb_xmas);
