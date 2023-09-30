import findAllFiles from "../components/io/findAllFiles.mjs";
import { duration } from "mitata/reporter/fmt.mjs";
import { readFileSync, writeFileSync } from "node:fs";

writeFileSync(
  "./bench/results.md",
  "",
);

findAllFiles("./bench/results/")
  .map((x) => x[0])
  .sort((a, b) =>
    b.split("-").pop().split(".")[0].localeCompare(
      a.split("-").pop().split(".")[0],
    )
  )
  .map((x) => JSON.parse(readFileSync(x)))
  .forEach((json) =>
    console.log(
      `\n# ${json.runtime}\n` +
        Array.from(
          json.benchmarks.reduce(
            (acc, benchmark) => acc.add(benchmark.group),
            new Set(),
          ),
        ).map((groupName) =>
          json.benchmarks.filter((benchmark) => benchmark.group === groupName)
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
          ].join("\n")
        ).join("\n\n"),
    )
  );
