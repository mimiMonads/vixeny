type CheckTools = {
  getArgsname: (f: (args: any) => any) => string | string[] | null;
  getDestructedElements: (f: (args: any) => any) => (toFind: string) => string[];
  getDots: (f: (args: any) => any) => (toSearch: string) => string[];
};

export default (((regex) => ({
  getArgsname: (f) =>
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
  getDestructedElements: (f) => (toFind) =>
    (
      (match) =>
        match && match.length > 0
          ? match![1].split(",").map((key) => key.trim())
            .map((key) => key.trim().replace(/[};]$/, ""))
          : []
    )(
      (
        new RegExp(
          `const\\s*\\{([^\\}]*)\\}\\s*=\\s*${toFind}(?:\\.|;|,|\\s)`,
          "g",
        )
      ).exec(
        f.toString(),
      ),
    ),
  getDots: (f) => (toSearch) =>
    [
      ...f.toString()
        .split(new RegExp(`\\b${toSearch}(\\.|\\?\\.)`))
        .slice(1)
        .map((x: string) => x.slice(0, x.match(/[^\w]/)?.index ?? x.length))
        .reduce(
          (acc: Set<string>, x) => (acc.add(x), acc),
          new Set<string>(),
        ),
    ].filter(Boolean),
}) 
)({
  simpleArgsRegex: /^\s*\(([^)]+)\)/,
  destructuredArgsRegex: /^\s*\(\{([^}]+)\}\)/,
  noArgsRegex: /^\s*\(\s*\)/,
})) as CheckTools
