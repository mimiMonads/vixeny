export default (a) => (b) => (d) =>
  (
    (result) => (
      (
        result.set(a),
          result.set(b, a.length),
          result.set(d, a.length + b.length),
          result
      )
    )
  )(
    new Uint8Array(a.length + b.length + d.length),
  );
