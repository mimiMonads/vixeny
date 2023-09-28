import { bench, group, run } from "mitata";
import queryParser from "../components/queries/queryParser.mjs";
import parseArguments from "../components/rtUtil/parseArguments.mjs";
const args = parseArguments();

const parser = queryParser()(["param1"]);
const multiParser = queryParser()(["param1", "param2"]);

const url =
  "https://example.com/page?param1=value1&param2=value2&param3=value3";

group("One query", () => {
  bench("new URL", () => ({
    param1: new URL(url).searchParams.get("param1"),
  }));
  bench("Vixeny query parser", () => parser(url));
});

group("multi query", () => {
  bench("new URL", () => {
    const uri = new URL(url);
    return {
      param1: uri.searchParams.get("param1"),
      param2: uri.searchParams.get("param2"),
      param3: uri.searchParams.get("param3"),
    };
  });
  bench("Vixeny query parser", () => multiParser(url));
});

await run({
  json: "json" in args,
});
