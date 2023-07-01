// deno-lint-ignore-file no-explicit-any
export default     (f: (arg0: (y: any) => any) => any) =>
((x) => x(x))((x: (arg0: any) => ({ (arg0: any): any; new (): any })) =>
  f((y: any) => x(x)(y))
)