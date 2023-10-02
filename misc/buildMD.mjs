import findAllFiles from "../components/files/findAllFiles.mjs";
import { duration } from "mitata/reporter/fmt.mjs";
import { readFileSync, writeFileSync } from "node:fs";

function summaryToMarkdown(benchmarks) {
  benchmarks = benchmarks.filter(b => !b.error);
  benchmarks.sort((a, b) => a.stats.avg - b.stats.avg);
  const baseline = benchmarks.find(b => b.baseline) || benchmarks[0];

  let output = `## **Summary** ${baseline.group ? `for *${baseline.group}*` : ''}\n\n`;
  output += `### **${baseline.name}** \n\n`;

  benchmarks.filter(b => b !== baseline).forEach(b => {
      const diff = Number((1 / baseline.stats.avg * b.stats.avg).toFixed(2));
      const indicator = diff > 1 ? 'faster' : 'slower';
      const color = diff > 1 ? 'green' : 'red'; 
      output += `- <span style="color:${color}">${diff}x **${indicator}**</span> than *${b.name}*\n`;
  });

  return output;
}

const parserd = json =>      `\n# ${json.runtime}\n` +
Array.from(
  json.benchmarks.reduce(
    (acc, benchmark) => acc.add(benchmark.group),
    new Set(),
  ),
).map((groupName) =>
  json.benchmarks.filter((benchmark) => benchmark.group === groupName).filter( x =>  "stats" in x)
).map((groupBenchmarks) =>
  `\n## ${groupBenchmarks[0].group}\n` +
  "| Name | Time (Avg) | Range | p75 | p99 | p995 |\n|------|------------|-------|-----|-----|------|\n" +
  [
    ...groupBenchmarks.map((y, i) =>
      `| ${y.name} | ${duration(y.stats?.avg ?? 0)} | (${
        duration(y.stats?.min ?? 0)
      } .. ${duration(y.stats?.max ?? 0)}/iter) | ${
        duration(y.stats?.p75 ?? 0)
      } | ${duration(y.stats?.p99 ?? 0)} | ${
        duration(y.stats?.p995 ?? 0)
      } |`
    ),
  ].join("\n")  + summaryToMarkdown(groupBenchmarks) + "\n\n"
).join("\n\n")


findAllFiles("./bench/json/")
  .map((x) => x[0])
  .forEach( x => writeFileSync("./bench/results/" + x.split("/").at(-1) + ".md", parserd(JSON.parse(readFileSync(x)))))



