const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `125 17`;

const lines = text.split("\n").filter((line) => line.length != 0)[0];
const stones = lines.split(" ").map((nb) => parseInt(nb));

const NB_BLINKING = 75;

// Memoize utility (idea from reddit)
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const blink = memoize((stone, nb_iters) => {
  if (nb_iters == 0) return 1;

  if (stone == 0) return blink(1, nb_iters - 1);

  if (stone.toString().length % 2 == 0) {
    const stone_string = stone.toString();

    const left = parseInt(stone_string.slice(0, stone_string.length / 2));
    const right = parseInt(stone_string.slice(stone_string.length / 2, stone_string.length));

    return blink(left, nb_iters - 1) + blink(right, nb_iters - 1);
  }

  return blink(stone * 2024, nb_iters - 1);
});

let nb_stone = 0;

stones.forEach((stone) => {
  const nb_generated_stone = blink(stone, NB_BLINKING);

  nb_stone += nb_generated_stone;
});

console.log(`Nb stones after ${NB_BLINKING} blinks: `, nb_stone);
