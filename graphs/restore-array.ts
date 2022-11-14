function restoreArray(adjacentPairs: number[][]): number[] {
  const edges: Record<number, number[]> = {};
  for (const [v1, v2] of adjacentPairs) {
    if (!edges[v1]) {
      edges[v1] = [];
    }
    if (!edges[v2]) {
      edges[v2] = [];
    }
    edges[v1].push(v2);
    edges[v2].push(v1);
  }
  const root = parseInt(
    Object.keys(edges).find(
      (key: string) => edges[parseInt(key, 10)].length === 1
    )!,
    10
  );
  const visited: Set<number> = new Set();
  const q = [edges[root][0]];
  const result = [];
  result.push(root);
  visited.add(root);
  while (q.length) {
    const next = q.splice(0, 1)[0];
    if (visited.has(next)) continue;
    visited.add(next);
    result.push(next);
    const nextVertices = edges[next];
    q.push(...nextVertices);
  }
  return result;
}

const tests = [
  {
    data: [
      [2, 1],
      [3, 4],
      [3, 2],
    ],
    expect: [1, 2, 3, 4],
  },
];

for (const test of tests) {
  const result = restoreArray(test.data);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}

console.log('success');
