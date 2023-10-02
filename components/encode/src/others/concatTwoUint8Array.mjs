export default () => (a) => (b) => (
    result => (
      (
        result.set(a),
        result.set(b, a.length),
        result
      )
    )
  )(
    new Uint8Array(a.length + b.length)
  )