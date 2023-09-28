export default (data) =>
  `## Benchmark Results\n\n` +
  "| Name       | Group  | Avg Tasks in 500ms |\n" +
  "|------------|--------|--------------------|\n" +
  data.benchmarks.map((benchmark) =>
    `| ${benchmark.name} | ${benchmark.group} | ${
      (500 / benchmark.stats.avg).toFixed(2)
    } |`
  ).join("\n");
