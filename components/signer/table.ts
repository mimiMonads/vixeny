export default (
  (s) =>
    (
      (p) =>
        (
          (el) =>
            "(((" + Array.from(
              { length: 8 },
              (_, i) =>
                `( ${p[i === 0 ? 0 : i * 3]} ^ a[ar[${
                  el[i === 0 ? 0 : i * 4]
                }]]  ^  ${p[i === 0 ? 1 : i * 3 + 1]} ^ a[ar[${
                  el[i === 0 ? 1 : 4 * 3 + 1]
                }]]  ^  ${p[i === 0 ? 2 : i * 3 + 2]} ^ a[ar[${
                  el[i === 0 ? 2 : 4 * 3 + 2]
                }]]  ^  ${p[i === 0 ? 3 : i * 3 + 3]} ^ a[ar[${
                  el[i === 0 ? 3 : 4 * 3 + 3]
                }]] )`,
            ).join("+") + ") >>> 0) % 65)"
        )(
          "01234567".repeat(4).split(""),
        )
    )(
      Array.from(
        { length: 32 },
        (_, i) => "0x" + s.slice(i === 0 ? 0 : i * 3, i * 3 + 8),
      ),
    )
)(
  Array.from(
    { length: 4 },
    (_, _i) => crypto.randomUUID().split("-").filter((x) => x != "").join(""),
  ).join(""),
);
