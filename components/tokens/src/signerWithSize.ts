export default (n: number) =>
  new Function(
    `return ar => p=> s=> ( a=>[${Array.from({ length: n }, (_, i) => `p[ar[${i % 8}]([${Array.from({ length: 8 }, (_, j) => `a[${(n - 7 + i + j) % n}]`).join(",")}])]`).join(',')}].reduce((acc,x)=> acc+x, s + "." ))([${Array.from({ length: n }, (_, i) => `s.charCodeAt(${i})`).join(",")}]) `
  )()

