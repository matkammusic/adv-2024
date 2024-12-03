const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

const reports = text.split("\n");

reports.splice(-1);

let safe_reports = 0;

/**
    returns true if levels are decreasing, false if levels are increasing, throw an error otherwise
*/
const isDeacreasing = (levels) => {
  let decreasing = null;

  for (let i = 1; i < levels.length; i++) {
    const previous = levels[i - 1];
    const current = levels[i];

    if (previous > current && i == 1) {
      decreasing = true;
      continue;
    } else if (previous < current && i == 1) {
      decreasing = false;
      continue;
    } else if (previous == current) {
      throw new Error("neither decreasing or increseaing");
    }

    if (previous > current && decreasing) continue;
    if (previous < current && !decreasing) continue;

    throw new Error("order changing");
  }

  return true;
};

/**
    returns true is the difference is from 1 to 3, false otherwise
*/
const differing = (levels) => {
  for (let i = 1; i < levels.length; i++) {
    const previous = levels[i - 1];
    const current = levels[i];

    const difference = Math.abs(previous - current);

    if (difference < 1 || difference > 3) return false;
  }

  return true;
};

reports.forEach((report) => {
  const levels = report.split(" ").map((level) => parseInt(level));

  const checks = [];

  levels.forEach(() => checks.push(false));

  for (let i = 0; i < levels.length; i++) {
    const stripped_levels = [...levels];
    stripped_levels.splice(i, 1);

    let check1 = false;
    let check2 = false;

    try {
      check1 = isDeacreasing(stripped_levels);
    } catch {
      check1 = false;
    }

    check2 = differing(stripped_levels);

    if (check1 && check2) {
      checks[i] = true;
    } else {
      checks[i] = false;
    }
  }

  checks.includes(true) && safe_reports++;
});

console.log("safe reports: ", safe_reports);
