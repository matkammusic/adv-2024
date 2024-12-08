const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;

const equations = text.split("\n").filter((line) => line.length != 0);

let total = 0;

const add = (nb1, nb2) => {
  return nb1 + nb2;
};

const multiply = (nb1, nb2) => {
  return nb1 * nb2;
};

const concat = (nb1, nb2) => {
  return parseInt(Number(nb1).toString() + Number(nb2).toString());
};

const operators = [add, multiply, concat];

equations.forEach((equation) => {
  const parts = equation.split(":");
  const result = parseInt(parts[0]);
  const numbers = parts[1]
    .trim()
    .split(" ")
    .map((nb) => parseInt(nb));

  let possibilities = [numbers[0], numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    const nb = numbers[i];

    const new_possibilities = [];

    possibilities.forEach((possibility) => {
      operators.forEach((operator) => {
        new_possibilities.push(operator(possibility, nb));
      });
    });

    possibilities = new_possibilities;
  }

  if (possibilities.indexOf(result) != -1) total += result;
});

console.log("total: ", total);
