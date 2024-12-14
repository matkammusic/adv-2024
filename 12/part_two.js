const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `AAAA
// BBCD
// BBCC
// EEEC`;

const lines = text.split("\n").filter((line) => line.length != 0);

const garden = [];

for (let i = 0; i < lines.length; i++) {
  garden.push([]);
  for (let j = 0; j < lines[i].length; j++) {
    garden[i].push(lines[i][j]);
  }
}

const clusters = [];
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const find_cluster = (plot, cluster) => {
  cluster.push(plot);

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    const new_x = plot.x + direction[0];
    const new_y = plot.y + direction[1];

    if (new_x < 0 || new_x >= garden[0].length || new_y < 0 || new_y >= garden.length) continue;

    const new_plot = {
      type: garden[new_y][new_x],
      x: new_x,
      y: new_y,
    };

    const is_already_clustered = cluster.find((plot) => plot.x === new_x && plot.y === new_y);

    if (is_already_clustered) continue;

    if (new_plot.type === plot.type) {
      cluster = find_cluster(new_plot, cluster);
    }
  }

  return cluster;
};

const create_clusters = () => {
  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      const plot = {
        type: garden[i][j],
        x: j,
        y: i,
      };

      const is_already_clustered = clusters.find((cluster) => cluster.find((plot) => plot.x === j && plot.y === i));

      if (is_already_clustered) continue;

      const cluster = find_cluster(plot, []);

      clusters.push(cluster);
    }
  }
};

create_clusters();

const cluster_prices = [];

// inspired from reddit comments (nb side = nb of corners)
const calculate_corners = (cluster) => {
  let corners = 0;

  for (let i = 0; i < cluster.length; i++) {
    const plot = cluster[i];
    const x = plot.x;
    const y = plot.y;

    const top = garden[y - 1] ? garden[y - 1][x] : null;
    const bottom = garden[y + 1] ? garden[y + 1][x] : null;
    const left = garden[y][x - 1] ? garden[y][x - 1] : null;
    const right = garden[y][x + 1] ? garden[y][x + 1] : null;

    if (top != plot.type && right != plot.type) corners++;
    if (right != plot.type && bottom != plot.type) corners++;
    if (bottom != plot.type && left != plot.type) corners++;
    if (left != plot.type && top != plot.type) corners++;

    const top_right = garden[y - 1] ? garden[y - 1][x + 1] : null;
    const bottom_right = garden[y + 1] ? garden[y + 1][x + 1] : null;
    const bottom_left = garden[y + 1] ? garden[y + 1][x - 1] : null;
    const top_left = garden[y - 1] ? garden[y - 1][x - 1] : null;

    if (top == plot.type && right == plot.type && top_right != plot.type) corners++;
    if (right == plot.type && bottom == plot.type && bottom_right != plot.type) corners++;
    if (bottom == plot.type && left == plot.type && bottom_left != plot.type) corners++;
    if (left == plot.type && top == plot.type && top_left != plot.type) corners++;
  }

  return corners;
};

const calculate_cluster_price = () => {
  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    const area = cluster.length;
    const corners = calculate_corners(cluster);

    cluster_prices.push(area * corners);
  }
};

calculate_cluster_price();

console.log(
  "total price: ",
  cluster_prices.reduce((acc, price) => acc + price, 0),
);
