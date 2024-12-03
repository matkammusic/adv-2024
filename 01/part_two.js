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

let total_similarity = 0;

for (let i = 0; i < l1.length; i++) {
  let nb_similar = 0;

  for (let ii = 0; ii < l2.length; ii++) {
    if (l1[i] == l2[ii]) nb_similar++;
  }

  total_similarity += l1[i] * nb_similar;
}

console.log("total similarity: ", total_similarity);
