function climbStairs(n: number): number {
  if (n === 0) return 0;
  let dp1 = 1;
  let dp2 = 1;
  for (let i = 2; i <= n; i++) {
    const temp = dp2;
    dp2 += dp1;
    dp1 = temp;
  }
  return dp2;
};