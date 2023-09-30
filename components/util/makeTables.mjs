export default (data) =>
  `## ${data.runtime}\n\n` +
  "| Name       | Group  | Tasks |\n" +
  "|------------|--------|--------------------|\n" +
  data.benchmarks.map((benchmark) =>
    `| ${benchmark.name} | ${benchmark.group} | ${
      "stats" in benchmark ? benchmark.stats.avg.toFixed(0) : "Error"
    } |`
  ).join("\n");
