export default (a: string[][][]) =>
  a.map(
    (x) =>
      x.map((y) =>
        (
          new Function(
            `return s=>${
              y.reduceRight(
                (acc, z, i) => `s.indexOf("${z}")===0?${i}:` + acc,
                "-1",
              )
            }`,
          )
        )()
      ),
  );
