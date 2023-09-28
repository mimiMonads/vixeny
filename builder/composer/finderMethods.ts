export default ((ar) => (n) =>
  new Function(
    "return s=>" +
      ar.map((x, i) => "s==='" + x + "'?" + i + ":").reduceRight(
        (acc, v) => v + acc,
        n.toString(),
      ),
  )()) as (ar: string[]) => (n: number) => (s: string) => number;
