export default ((regex) => ({
  getArgsname: (f: (args: any) => any) =>
    (
      (string) =>
        regex.noArgsRegex.test(string)
          ? null
          : regex.destructuredArgsRegex.test(string)
          ? regex.destructuredArgsRegex.exec(string)![1].split(",").map((arg) =>
            arg.trim()
          )
          : regex.simpleArgsRegex.test(string)
          ? regex.simpleArgsRegex.exec(string)![1].trim()
          : null
    )(
      (
        (innerString) =>
          innerString.slice(
            innerString.indexOf("function") + 1 ??
                Infinity < innerString.indexOf("{")
              ? innerString.indexOf("(")
              : 0,
            innerString.indexOf(")") + 1 ?? innerString.indexOf("=") + 1,
          )
      )(
        f.toString(),
      ),
    ),
}))({
  simpleArgsRegex: /^\s*\(([^)]+)\)/,
  destructuredArgsRegex: /^\s*\(\{([^}]+)\}\)/,
  noArgsRegex: /^\s*\(\s*\)/,
});
