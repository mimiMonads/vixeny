export default (ar: string[][][])  => (
  parser => (
    resolver => ar
      .map( x =>  x
        .map( y => resolver(parser(y)))) 
  )(
    (a: [string, number, number][][]) =>
    new Function(
      `return  s => ${
        a
          .map((x, i) =>
            x.length === 0
              ? `s === "/"? ${i}  : `
              : (
                  (x.reduce(
                    (acc, y) =>  y[0] === ""  ? 's.length === 0' : `&& s.slice(${y[1]},${y[2]}) === "${y[0]}"` + acc,
                    ""
                  ) as string) + `? ${i} :`
                ).slice(2)
          )
          .reduceRight((acc, x) => x + acc) + "-1"
      }`
    )() as (s:string) => number
  )
)(
  (s: string[]) =>
  ((s1) =>
    s1
      .map(
        (x) =>
          [
            x,
            x
              .map((y) => (y !== "" ? y.length : 0))
              .map((y, i, a) =>
                i === 0 ? y : a.slice(0, i).reduce((acc, s) => acc + s) + i + y
              )
  
              .map((y, i, a) => (i === 0 ? [0, y] : [a[i - 1] + 1, y])),
          ] as [string[], number[][]]
      )
      .map(([a, n]) => a.map((x, i) => [x, n[i][0], n[i][1]])))
    (
    s
    .map( x => x === "" ? x : "/" + x) 
    .map((x) =>
      x.at(-1) === "/"
        ? x
            .split("/", x.split("/").length - 1)
            .map((x, b, a) => (a.length <= b + 1 ? x + "/" : x))
            .slice(1)
        : x.split("/").slice(1)
    )
  ) as [string, number, number][][]
)








