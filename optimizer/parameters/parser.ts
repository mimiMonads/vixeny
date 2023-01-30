export default                 
((a: string[]) =>
(new Function(
  `return e => ({ ${
    a.reduce((acc, v, i) => acc + `"${v}": e[${i}],`, "")
  }})`,
))()) as (m:string[]) => (e:string[]) => Record<string,string>