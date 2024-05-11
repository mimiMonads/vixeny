/**
 * Parses command-line arguments passed to the script and returns an object with key-value pairs.
 * For flags without explicit values, the value is set to `true`.
 *
 * This function is designed to work with both Deno and Node.js environments, automatically detecting
 * the environment to use the appropriate source of arguments.
 *
 * Example usage in Node.js:
 * ```bash
 * node script.js --name=John --age=30 --admin
 * ```
 * This would result in: `{ name: "John", age: "30", admin: true }`
 *
 * Example usage in Deno:
 * ```bash
 * deno run script.js --name=John --age=30 --admin
 * ```
 * Similar output as Node.js example.
 *
 * @returns {ParsedArgs} An object representing the parsed command-line arguments.
 */

//TODO: introduce `name` and add , interface
type ParsedArgs = {
  [key: string]: string | boolean;
};

export default (): ParsedArgs =>
  //@ts-ignore
  (typeof Deno !== "undefined" ? Deno.args : process.argv.slice(2))
    .map<[string, string | boolean]>((arg: string) =>
      arg.startsWith("--")
        ? arg.slice(2).split("=") as [string, string]
        : [arg, true]
    )
    .reduce<ParsedArgs>(
      (acc: ParsedArgs, [key, value]: [string, string | boolean]) => ({
        ...acc,
        [key]: value === undefined ? true : value,
      }),
      {},
    );
