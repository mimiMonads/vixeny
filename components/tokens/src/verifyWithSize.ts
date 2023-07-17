export default (n: number) =>
  new Function(
    ` return ar => p=> s=>( a=> s.length===${(n * 2) + 1}  &&${Array.from({ length: n }, (_, i) => `p[ar[${i % 8}]([${Array.from({ length: 8 }, (_, j) => `a[${(n - 7 + i + j) % n}]`).join(",")}])] ===  s[${i + 1 + n}]`).join('&&')})([${Array.from({ length: n }, (_, i) => `s.charCodeAt(${i})`).join(",")}]) `
  )()
