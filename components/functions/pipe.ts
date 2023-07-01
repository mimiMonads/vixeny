export default  (pipe: (arg0: (...args: any) => any) => any) => (fn: (arg0: any) => any) => (nextFn: (arg0: any) => any) => nextFn ? pipe((...args: any) => nextFn(fn(args))) : fn
