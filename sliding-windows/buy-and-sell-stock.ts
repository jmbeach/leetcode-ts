function maxProfit(prices: number[]): number {
  let low = 0;
  let high = 1;
  if (prices.length < 2) return 0;
  let bestProfit = 0;
  while (low < high && high < prices.length) {
    let lowPrice = prices[low];
    const highPrice = prices[high];
    while (lowPrice > highPrice) {
      low++;
      lowPrice = prices[low];
    }
    const profit = highPrice - lowPrice;
    if (profit > bestProfit) {
      bestProfit = profit;
    }
    high++;
  }

  return bestProfit;
}

const tests = [
  { data: [7, 1, 5, 3, 6, 4], expect: 5 },
  { data: [7, 6, 4, 3, 1], expect: 0 },
  { data: [2, 1, 4], expect: 3 },
  { data: [2, 7, 1, 11, 4], expect: 10 },
]
const largeData = Deno.readTextFileSync('data.json');
tests.push({ data: JSON.parse(largeData), expect: 999 });

for (const test of tests) {
  const startTime = new Date();
  const result = maxProfit(test.data);
  const endTime = new Date();
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
  const duration = endTime.getTime() - startTime.getTime();
  if (duration > 500) {
    throw new Error(`${JSON.stringify(test)} - took too long - ${duration}ms`)
  }
}

console.log('success')