const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

// Button A: X+26, Y+66
// Button B: X+67, Y+21
// Prize: X=12748, Y=12176

// Button A: X+17, Y+86
// Button B: X+84, Y+37
// Prize: X=7870, Y=6450

// Button A: X+69, Y+23
// Button B: X+27, Y+71
// Prize: X=18641, Y=10279`;

const lines = text.split("\n").filter((line) => line.length != 0);

const MAX_PRESS = 100;
const PRESS_COST_A = 3;
const PRESS_COST_B = 1;

const presses = [];

for (let i = 2; i < lines.length; i += 3) {
  const lineA = lines[i - 2];
  const lineB = lines[i - 1];
  const linePrize = lines[i];

  const buttonA = lineA.split(" ");
  const buttonB = lineB.split(" ");
  const prize = linePrize.split(" ");

  const buttonA_X = parseInt(buttonA[2].split("+")[1]);
  const buttonA_Y = parseInt(buttonA[3].split("+")[1]);

  const buttonB_X = parseInt(buttonB[2].split("+")[1]);
  const buttonB_Y = parseInt(buttonB[3].split("+")[1]);

  const prize_X = parseInt(prize[1].split("=")[1]);
  const prize_Y = parseInt(prize[2].split("=")[1]);

  // Cramer's rule, insight from a reddit meme
  const determinant = buttonA_X * buttonB_Y - buttonA_Y * buttonB_X;
  const detX = prize_X * buttonB_Y - buttonB_X * prize_Y;
  const detY = buttonA_X * prize_Y - prize_X * buttonA_Y;

  const pressA = detX / determinant;
  const pressB = detY / determinant;

  if (pressA > MAX_PRESS || pressB > MAX_PRESS) continue;
  if (pressA != Math.floor(pressA) || pressB != Math.floor(pressB)) continue;

  presses.push([pressA, pressB]);
}

//token for all the presses
const token = presses.reduce((acc, [pressA, pressB]) => acc + pressA * PRESS_COST_A + pressB * PRESS_COST_B, 0);

console.log("minimum tokens: ", token);
