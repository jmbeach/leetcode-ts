// generate data
const datasetSizes = [
  100,
  1000,
  10000,
  100000,
  1000000
]
for (const dataset of datasetSizes) {
  const fileName = `dataset-${dataset}.txt`;
  let result = '[';
  const nums = [...new Array(dataset)].map(() => {
    let randomNumber = Math.floor(Math.random() * 100);
    if (Math.random() >= 0.8) {
      randomNumber *= -1;
    }

    return randomNumber;
  });

  result += nums.join(', ');
  result += ']\n[';
  result += nums.sort((a, b) => a - b).join(', ');
  result += ']';
  Deno.writeTextFileSync(fileName, result);
}