const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `125 17`;

const lines = text.split("\n").filter((line) => line.length != 0)[0];

const NB_BLINKING = 25;

let stones = lines.split(" ");

const blink = () => {
  let temp = "";

  stones.forEach((stone) => {
    if (stone == "0") {
      temp += "1";
    } else if (stone.length % 2 == 0) {
      const left = parseInt(stone.slice(0, stone.length / 2));
      const right = parseInt(stone.slice(stone.length / 2, stone.length));

      temp += left.toString() + " " + right.toString();
    } else {
      temp += (parseInt(stone) * 2024).toString();
    }

    temp += " ";
  });

  stones = temp.trim().split(" ");
};

for (let i = 0; i < NB_BLINKING; i++) {
  blink();
}

console.log("Nb stones after 25 blinks: ", stones.length);
