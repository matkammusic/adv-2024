const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `2333133121414131402`;

const lines = text.split("\n").filter((line) => line.length != 0)[0];

// used reddit to switch from returning a string to an array of numbers
const create_blocks = (lines) => {
  let blocks = [];
  let index = 0;
  let same_block = true;

  for (let i = 0; i < lines.length; i++) {
    const length = lines[i];

    if (length == 0) {
      same_block = false;
    }

    for (let j = 0; j < length; j++) {
      if (i % 2 == 1) {
        blocks.push(".");

        same_block = false;
      }

      if (i % 2 == 0) {
        if (!same_block) {
          index++;

          same_block = true;
        }

        blocks.push(index);
      }
    }
  }

  return blocks;
};

const compact_blocks = (blocks) => {
  let compacted_blocks = [...blocks];

  const nb_empty = blocks.filter((block) => block == ".").length;

  for (let i = blocks.length - 1; i >= 0; i--) {
    const id = blocks[i];

    if (id == ".") continue;

    const new_index = compacted_blocks.indexOf(".");

    if (new_index == -1) break;

    compacted_blocks[new_index] = id;
  }

  compacted_blocks.splice(blocks.length - nb_empty, nb_empty);

  return compacted_blocks;
};

const compute_checksum = (compacted_blocks) => {
  let checksum = 0;

  for (let i = 0; i < compacted_blocks.length; i++) {
    checksum += i * compacted_blocks[i];
  }

  return checksum;
};

const blocks = create_blocks(lines);
const compacted_blocks = compact_blocks(blocks);
const checksum = compute_checksum(compacted_blocks);

console.log("checksum: ", checksum);
