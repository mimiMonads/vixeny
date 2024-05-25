import finder from "./finder.ts";

export default (ar: string[]) =>
  `(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({${
    ar.map((x) => ` ${x}: encodeURIComponent(${finder(x)})`).join(",")
  }}))`;
