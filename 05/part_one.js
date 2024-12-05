const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

const lines = text.split("\n");

const rules = lines.filter((line) => line.includes("|"));
const updates = lines.filter((line) => line.includes(","));

let total_safe = 0;

const checkUpdate = (numbers) => {
  let safe = true;

  for (let j = 0; j < numbers.length && safe; j++) {
    const nb = numbers[j];
    const nb_rules = rules.filter((rule) => rule.includes(nb));

    for (let k = 0; k < nb_rules.length && safe; k++) {
      const nb_rule = nb_rules[k];
      const parts = nb_rule.split("|");

      if (parts.indexOf(nb) == 0) {
        const after = parts[1];

        if (numbers.indexOf(after) < j && numbers.indexOf(after) != -1) {
          safe = false;
        }
      } else {
        const before = parts[0];

        if (numbers.indexOf(before) > j) {
          safe = false;
        }
      }
    }
  }

  return safe;
};

for (let i = 0; i < updates.length; i++) {
  const update = updates[i];
  const numbers = update.split(",");

  const is_safe = checkUpdate(numbers);

  if (!is_safe) continue;

  const center = numbers[Math.floor(numbers.length / 2)];

  total_safe += parseInt(center);
}

console.log("total safe: ", total_safe);
