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

const find_free_space = (compacted_blocks, block_length, current_position) => {
  let free_space = 0;

  for (let i = 0; i < current_position; i++) {
    if (compacted_blocks[i] == ".") free_space++;
    if (compacted_blocks[i] != ".") free_space = 0;
    if (free_space == block_length) return i - block_length + 1;
  }

  return -1;
};

const compact_blocks = (blocks) => {
  let compacted_blocks = [...blocks];

  let current_id = blocks[blocks.length - 1];
  let current_block_length = 0;
  let current_start_pos = blocks.length - 1;

  for (let i = blocks.length - 1; i >= 0; i--) {
    const id = blocks[i];

    if (id == ".") continue;

    if (current_id == id) {
      current_block_length++;
      current_start_pos = Math.min(current_start_pos, i);
      continue;
    }

    const start_index = find_free_space(compacted_blocks, current_block_length, current_start_pos);

    if (start_index == -1) {
      current_id = id;
      current_block_length = 1;
      current_start_pos = i;
      continue;
    }

    const end_index = start_index + current_block_length;

    for (let j = start_index; j < end_index; j++) {
      compacted_blocks[j] = current_id;
    }

    // replace the old positions with free spaces
    for (let j = end_index; j < blocks.length; j++) {
      if (compacted_blocks[j] == current_id) {
        compacted_blocks[j] = ".";
      }
    }

    current_id = id;
    current_block_length = 1;
    current_start_pos = i;
  }

  return compacted_blocks;
};

const compute_checksum = (compacted_blocks) => {
  let checksum = 0;

  for (let i = 0; i < compacted_blocks.length; i++) {
    if (compacted_blocks[i] == ".") continue;

    checksum += i * compacted_blocks[i];
  }

  return checksum;
};

const blocks = create_blocks(lines);
const compacted_blocks = compact_blocks(blocks);

console.log("compacted_blocks: ", compacted_blocks);

const checksum = compute_checksum(compacted_blocks);

console.log("checksum: ", checksum);
