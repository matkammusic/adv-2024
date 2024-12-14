const input_path = "./input.txt";
const file = Bun.file(input_path);
const text = await file.text();

// const text = `RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE`;

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

const calculate_perimeter = (cluster) => {
  let perimeter = 0;

  for (let i = 0; i < cluster.length; i++) {
    const plot = cluster[i];

    for (let j = 0; j < directions.length; j++) {
      const direction = directions[j];
      const new_x = plot.x + direction[0];
      const new_y = plot.y + direction[1];

      if (new_x < 0 || new_x >= garden[0].length || new_y < 0 || new_y >= garden.length) {
        perimeter++;
        continue;
      }

      const neighbour = {
        type: garden[new_y][new_x],
        x: new_x,
        y: new_y,
      };

      if (neighbour.type != plot.type) perimeter++;
    }
  }

  return perimeter;
};

const calculate_cluster_price = (cluster) => {
  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    const area = cluster.length;
    const perimeter = calculate_perimeter(cluster);

    cluster_prices.push(area * perimeter);
  }
};

calculate_cluster_price();

console.log(
  "total price: ",
  cluster_prices.reduce((acc, price) => acc + price, 0),
);
