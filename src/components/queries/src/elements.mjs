import finder from "./finder.mjs";

export default (ar) =>
  `(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ({${
    ar.map((x) => ` ${x}: ${finder(x)}`).join(",")
  }}))`;
