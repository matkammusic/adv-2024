const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

const text_array = text.split("\n");

text_array.splice(-1);

const l1 = [];
const l2 = [];

text_array.forEach((line) => {
  const values = line.split("   ");
  l1.push(parseInt(values[0]));
  l2.push(parseInt(values[1]));
});

l1.sort();
l2.sort();

let total_distance = 0;

for (let i = 0; i < l1.length; i++) {
  const distance = Math.max(l1[i], l2[i]) - Math.min(l1[i], l2[i]);
  total_distance += distance;
}

console.log("total distance: ", total_distance);
