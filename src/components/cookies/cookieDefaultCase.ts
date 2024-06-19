export default (_o?: any) => (s: string) =>
  s
    ? Object.fromEntries(
      s
        .split("; ")
        .filter((x) =>
          x
            .indexOf("=") !== -1
        )
        .map((x) => x.split("=")),
    )
    : null;
