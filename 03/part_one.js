const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// used chatgpt to correct the pattern
const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;

const patterns = text.match(regex);

let total = 0;

patterns.forEach((pattern) => {
  const step1 = pattern.split("(")[1];
  const step2 = step1.split(",");
  const step3 = step2[1].split(")");

  const nb1 = step2[0];
  const nb2 = step3[0];

  total += nb1 * nb2;
});

console.log("total: ", total);
